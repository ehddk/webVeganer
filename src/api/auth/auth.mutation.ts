"use server";
import { handleServerError } from "@/utils/serverError.util";
import { authService } from "../services";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export const post = async (req: Auth.Post.Request) => {
  try {
    const data = await authService.post(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};

export const login = async (req: Auth.Login.Request) => {
  try {
    const data = await authService.login(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};

export const logout = async (req: Auth.Logout.Request) => {
  try {
    // const data = await authService.logout(req);
    // return data;

    const supabase = createSupabaseServerClient();
    await (await supabase).auth.signOut();
    return { ok: true };
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
export const put = async (req: Auth.Put.Request) => {
  try {
    const data = await authService.put(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};

export const deleteAuth = async (req: Auth.DeleteAuth.Request) => {
  try {
    const data = await authService.delete(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
