export async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      credentials: "include", // ✅ SEND NEXTAUTH COOKIES
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const msg = await res.text();
      return {
        success: false,
        message: msg || "Request failed",
        status: res.status,
      };
    }

    const json = await res.json().catch(() => ({}));

    return {
      success: true,
      ...json,
    };
  } catch (err) {
    console.error("Fetch Error:", err);
    return {
      success: false,
      message: err.message,
    };
  }
}
