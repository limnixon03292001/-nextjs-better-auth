"use server";

import { auth, ErrorCodes } from "@/lib/auth";
import { parseSetCookieHeader } from "better-auth/cookies";
import { cookies, headers } from "next/headers";
import { APIError } from "better-auth/api";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";
import transporter from "@/lib/nodemailer";
import { error } from "console";
import { success } from "better-auth";

export async function signUpEmailAction(formData: FormData) {
  const name = String(formData.get("name"));
  if (!name) return { error: "Please enter your name." };

  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email." };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password." };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCodes) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong. Please try again!" };

        default:
          return { error: err.message };
      }
    }
    return { error: "Internal Server Error" };
  }
}

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email." };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password." };
  //when working in server actions with next js we need to work with cookies api to set the cookie
  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
      // asResponse: true,
    });

    //-----MANUAL  WAY OF SETTING COOKIES
    // const setCookieHeader = res.headers.get("set-cookie");
    // if (setCookieHeader) {
    //   const cookie = parseSetCookieHeader(setCookieHeader);
    //   const cookieStore = await cookies();

    //   const [key, cookieAttributes] = [...cookie.entries()][0];

    //   const value = cookieAttributes.value;
    //   const maxAge = cookieAttributes["max-age"];
    //   const path = cookieAttributes.path;
    //   const httpOnly = cookieAttributes.httponly;
    //   const sameSite = cookieAttributes.samesite;

    //   cookieStore.set(key, decodeURIComponent(value), {
    //     maxAge,
    //     path,
    //     httpOnly,
    //     sameSite,
    //   });
    // }
    //----- END MANUAL  WAY OF SETTING COOKIES

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal Server Error" };
  }
}

export async function deleteUserAction({ userId }: { userId: string }) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) throw new Error("Unauthorized");

  if (session.user.role !== "Admin") {
    throw new Error("Forbidden");
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
        role: "User",
      },
    });

    if (session.user.id === userId) {
      await auth.api.signOut({
        headers: headersList,
      });

      redirect("/auth/login");
    }

    revalidatePath("/admin/dashboard");
    return { error: null };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    if (err instanceof Error) {
      return { error: err.message };
    }

    return { error: "Internal Server Error" };
  }
}

const styles = {
  container:
    "max-width:500px; margin: 20px auto; padding: 20px; border: 1px solid #DDD; border-radius: 6px;",
  heading: "font-size: 20px; color: #333;",
  paragraph: "font-size: 16px;",
  link: "display: inlin-block; margin-top: 15px; padding: 10px 15px; background: #007BFF; color: #FFF, text-decoration: none; border-radius: 4px;",
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `Next.js Better Auth - ${subject}`,
    html: `
      <div style="${styles.container}">
        <h1 style="${styles.heading}">${subject}</h1>
        <p style="${styles.paragraph}">${meta.description}</p>
        <a href="${meta.link}" style="${styles.link}">Click here</a>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("sendEmailAction", err);
    return { success: false };
  }
}
