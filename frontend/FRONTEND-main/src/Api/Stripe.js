export async function redirectToCheckout(cartItems) {
  const response = await fetch(
    "https://backenddjango-production-c48c.up.railway.app/api/checkout/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        items: cartItems,
      }),
    }
  );

  const data = await response.json();

  // USAR checkout_url directamente
  if (data.checkout_url) {
    window.location.href = data.checkout_url; // redirige directamente a Stripe
  } else {
    alert("No se pudo iniciar el pago.");
    console.error("Respuesta del backend:", data);
  }
}
