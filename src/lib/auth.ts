import { supabase } from "./supabase";

// Kullanıcının giriş durumunu kontrol et
export async function checkAuthStatus() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return { user, error };
  } catch (err) {
    console.error("Auth status check failed:", err);
    return { user: null, error: err };
  }
}

// Kullanıcı girişi
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (err) {
    console.error("Sign in failed:", err);
    return { data: null, error: err };
  }
}

// Kullanıcı çıkışı
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    console.error("Sign out failed:", err);
    return { error: err };
  }
}

// Auth state değişikliklerini dinle
export function onAuthStateChange(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
}

// Protected route için middleware
export async function requireAuth() {
  const { user, error } = await checkAuthStatus();

  if (error || !user) {
    if (typeof window !== "undefined") {
      window.location.href = "/giris";
    }
    return false;
  }

  return true;
}
