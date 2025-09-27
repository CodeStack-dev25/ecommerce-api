export const mailDetailShoppingAdmin = (ticket, mode) => {
  const user = ticket.user || {};
  const items = ticket.items || [];
  const date = new Date(ticket.createdAt);

  const itemsHTML = items
    .map((i, idx) => {
      return `
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px; text-align:center;">${idx + 1}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${i.title}</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align:center;">${i.color || "-"}</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align:center;">${i.size || "-"}</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align:center;">${i.quantity}</td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align:right;">$ ${i.price.toLocaleString("es-AR")}</td>
      </tr>`;
    })
    .join("");

  const total = ticket.total || 0;
  const discount = total * 0.2;
  const finalTotal = total - discount;

  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="text-align:center;">Detalle de su compra</h1>
    <p><strong>Fecha:</strong> ${date.toLocaleDateString("es-AR")} ${date.toLocaleTimeString("es-AR")}</p>
    <p><strong>Método de pago:</strong> ${mode}</p>
    <h2>Datos del comprador</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <th style="border: 1px solid #ccc; padding: 8px;">Nombre</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Email</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Teléfono</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Dirección</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Ciudad</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Código Postal</th>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px;">${user.name || "-"}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${user.email || "-"}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${user.phone || "-"}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${user.address || "-"}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${user.city || "-"}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${user.postalCode || "-"}</td>
      </tr>
    </table>

    <h2 style="margin-top: 20px;">Productos comprados</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <th style="border: 1px solid #ccc; padding: 8px;">#</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Producto</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Color</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Talle</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Cantidad</th>
        <th style="border: 1px solid #ccc; padding: 8px;">Precio</th>
      </tr>
      ${itemsHTML}
      <tr>
        <td colspan="5" style="border: 1px solid #ccc; padding: 8px; text-align:right;"><strong>Subtotal:</strong></td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align:right;">$ ${total.toLocaleString("es-AR")}</td>
      </tr>
      <tr>
        <td colspan="5" style="border: 1px solid #ccc; padding: 8px; text-align:right; color:red;"><strong>Descuento 20%:</strong></td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align:right; color:red;">- $ ${discount.toLocaleString("es-AR")}</td>
      </tr>
      <tr>
        <td colspan="5" style="border: 1px solid #ccc; padding: 8px; text-align:right;"><strong>Total final:</strong></td>
        <td style="border: 1px solid #ccc; padding: 8px; text-align:right;"><strong>$ ${finalTotal.toLocaleString("es-AR")}</strong></td>
      </tr>
    </table>
  </div>
  `;
};
