"use server";

import { auth, ErrorCodes } from "@/lib/auth";
import { parseSetCookieHeader } from "better-auth/cookies";
import { cookies, headers } from "next/headers";
import { APIError } from "better-auth/api";

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
