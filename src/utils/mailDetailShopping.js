export const mailDetailShopping = (ticket, mode) => {
  const { user, items, total } = ticket;

  const desc = ticket.total * 0.2;
  const totalConDescuento = ticket.total - desc;

  const date = new Date(ticket.createdAt);
  let item = items.map((i) => {
    return `           
               <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family: Arial, sans-serif; width: 100%; max-width: 600px; margin: 0 auto;">
  <tbody>
    <tr>
      <!-- Columna del producto -->
      <td style="padding: 10px 0; vertical-align: top;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
          <tbody>
            <tr>
              <!-- Título, color, tamaño, cantidad -->
              <td style="text-align: left; padding-bottom: 5px;">
                <h2 style="margin: 0; font-size: 16px; font-weight: 600; color: #000;">${i.title}</h2>
              </td>
            </tr>
            <tr>
              <td style="text-align: left; font-size: 14px; color: #333;">
                Color: ${i.color || "-"}
              </td>
            </tr>
            <tr>
              <td style="text-align: left; font-size: 14px; color: #333;">
                Tamaño: ${i.size || "-"}
              </td>
            </tr>
            <tr>
              <td style="text-align: left; font-size: 14px; color: #333;">
                Cant: ${i.quantity}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <!-- Columna del precio -->
      <td style="text-align: right; padding: 10px 0; vertical-align: top;">
        <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #000;">$ ${i.price}</h2>
      </td>
    </tr>
  </tbody>
</table>
            `;
  });

  return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]--><!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&amp;display=swap" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&amp;display=swap" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400..900;1,100..900&amp;display=swap" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:620px) {

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block div.fullWidth {
				max-width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.row-1 .column-1 .block-3.heading_block td.pad,
			.row-3 .column-1,
			.row-3 .row-content {
				padding: 0 !important;
			}

			.row-1 .column-1 .block-3.heading_block h1 {
				font-size: 60px !important;
			}

			.row-2 .column-1 .block-1.spacer_block {
				height: 40px !important;
			}

			.row-2 .column-1 .block-2.heading_block h2,
			.row-2 .column-1 .block-3.paragraph_block td.pad>div,
			.row-3 .column-2 .block-1.heading_block h2,
			.row-3 .column-2 .block-2.paragraph_block td.pad>div,
			.row-3 .column-2 .block-3.paragraph_block td.pad>div,
			.row-3 .column-3 .block-1.heading_block h2 {
				text-align: left !important;
			}

			.row-3 .column-1 .block-1.image_block .alignment div {
				margin: 0 auto !important;
			}

			.row-3 .column-3 .block-2.spacer_block {
				height: 75px !important;
			}

			.row-3 .column-2 .block-3.paragraph_block td.pad {
				padding: 5px 0 !important;
			}

			.row-8 .column-1 .block-1.divider_block td.pad,
			.row-8 .column-2 .block-1.divider_block td.pad {
				padding: 10px 0 30px !important;
			}

			.row-8 .column-1 .block-1.divider_block .alignment table,
			.row-8 .column-2 .block-1.divider_block .alignment table {
				display: inline-table;
			}

			.row-1 .column-1,
			.row-5 .column-1,
			.row-5 .column-2,
			.row-6 .column-1,
			.row-6 .column-2,
			.row-7 .column-1,
			.row-7 .column-2 {
				padding: 5px 15px !important;
			}

			.row-2 .column-1,
			.row-3 .column-2,
			.row-3 .column-3 {
				padding: 0 15px !important;
			}

			.row-8 .column-1,
			.row-8 .column-2 {
				padding: 40px 15px 0 !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="margin: 0; background-color: #ffffff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" background-color: #ffffff;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" background-color: #000;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style=" font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px; vertical-align: top;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
														<tr>
															<td class="pad">
																<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 500; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0"><span class="tinyMce-placeholder" style="word-break: break-word;">AEROTACTICO</span></h1>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-2" style="height:15px;line-height:15px;font-size:1px;">&#8202;</div>
													<table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-right:60px;text-align:center;width:100%;">
																<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Inter Tight','Arial'; font-size: 52px; font-weight: 400; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0"><span class="tinyMce-placeholder" style="word-break: break-word;">Gracias por confiar en nosotros. Tu pedido ha sido recibido y está siendo procesado.</span></h1>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-4" style="height:15px;line-height:15px;font-size:1px;">&#8202;</div>
													<table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#ffffff;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left">
																	<p style="margin: 0;">En AEROTACTICO, nos enorgullece ofrecer <strong>uniformes militares de alta calidad</strong>, diseñados con precisión para acompañarte en cada misión. Estamos comprometidos a entregar tu pedido con <strong>excelencia en cada detalle</strong>.</p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-6" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<div class="spacer_block block-7" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style=" font-weight: 400; text-align: left; vertical-align: top;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
													<table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-bottom:10px;text-align:center;width:100%;">
																<h2 style="margin: 0; color: #000; direction: ltr; font-family: 'Inter Tight','Arial'; font-size: 32px; font-weight: 600; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0">Detalles de tu pedido</h2>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:center">
																	<p style="margin: 0;">Número de Orden: ${ticket._id}</p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-4" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
						</table>
						${item}
					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style=" font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #f0f0f0;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-3" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
						<tbody>
							<tr>
								<td>
									<table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="50%" style=" font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-bottom:10px;text-align:center;width:100%;">
																<h2 style="margin: 0; color: #000; direction: ltr; font-family: 'Inter Tight','Arial'; font-size: 18px; font-weight: 600; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0"><span class="tinyMce-placeholder" style="word-break: break-word;">Subtotal</span></h2>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="50%" style=" font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-bottom:10px;text-align:center;width:100%;">
																<h2 style="margin: 0; color: #000; direction: ltr; font-family: 'Inter Tight','Arial'; font-size: 18px; font-weight: 600; letter-spacing: normal; line-height: 1.2; text-align: right; margin-top: 0; margin-bottom: 0"><span class="tinyMce-placeholder" style="word-break: break-word;">$ ${total.toLocaleString(
                                  "es-AR",
                                )}</span></h2>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
						<tbody>
							<tr>
								<td>
									<table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="50%" style=" font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#333333;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left">
																	<p style="margin: 0;">Descuento</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="50%" style=" font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#333333;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:right;">
																	<p style="margin: 0;">${mode === "Transferencia" ? "-20%" : "-"}</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
						<tbody>
							<tr>
								<td>
									<table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="50%" style=" font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;text-align:center;width:100%;">
																<h2 style="margin: 0; color: #000; direction: ltr; font-family: 'Inter Tight','Arial'; font-size: 18px; font-weight: 600; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder" style="word-break: break-word;">Total:</span></h2>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="50%" style=" font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;text-align:center;width:100%;">
																<h2 style="margin: 0; color: #000; direction: ltr; font-family: 'Inter Tight','Arial'; font-size: 18px; font-weight: 600; letter-spacing: normal; line-height: 1.2; text-align: right; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder" style="word-break: break-word;">$ ${
                                  mode === "Transferencia" ? totalConDescuento.toLocaleString("es-AR") : total.toLocaleString("es-AR")
                                }</span></h2>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-8" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="50%" style=" font-weight: 400; text-align: left; padding-top: 40px; vertical-align: top;">
													<table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-bottom:30px;padding-right:20px;padding-top:10px;">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #000000;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-bottom:10px;text-align:center;width:100%;">
																<h2 style="margin: 0; color: #000; direction: ltr; font-family: 'Inter Tight','Arial'; font-size: 18px; font-weight: 600; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder" style="word-break: break-word;">Fecha del pedido:</span></h2>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#333333;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;">
																	<p style="margin: 0;">${date.toLocaleDateString("es-AR")}</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#333333;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;">
																	<p style="margin: 0;">${date.toLocaleTimeString("es-AR")}</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="50%" style=" font-weight: 400; text-align: left; padding-top: 40px; vertical-align: top;">
													<table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-bottom:30px;padding-right:20px;padding-top:10px;">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #000000;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-bottom:10px;text-align:center;width:100%;">
																<h2 style="margin: 0; color: #000; direction: ltr; font-family: 'Inter Tight','Arial'; font-size: 18px; font-weight: 600; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder" style="word-break: break-word;">Destinatario:</span></h2>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#333333;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;">
																	<p style="margin: 0;">${user.name}</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#333333;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;">
																	<p style="margin: 0;">${user.address}</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#333333;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;">
																	<p style="margin: 0;">${user.city}</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#333333;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;">
																	<p style="margin: 0;">${user.postalCode}</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-9" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="font-weight: 400; text-align: left; vertical-align: top;">
													<table class="button_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;text-align:center;">
																<div class="alignment" align="center"><a href="www.example.com" target="_blank" style="color:#ffffff;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="www.example.com"  style="height:52px;width:268px;v-text-anchor:middle;" arcsize="0%" fillcolor="#000">
<v:stroke dashstyle="Solid" weight="1px" color="#ffffff"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #000; border-bottom: 1px solid #ffffff; border-left: 1px solid #ffffff; border-radius: 0px; border-right: 1px solid #ffffff; border-top: 1px solid #ffffff; color: #ffffff; display: inline-block; font-family: 'Inter Tight','Arial'; font-size: 16px; font-weight: 600; padding-bottom: 10px; padding-top: 10px; padding-left: 20px; padding-right: 20px; text-align: center; width: 100%; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">Ver Nuestros Productos</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-10" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style=" font-weight: 400; text-align: left; padding-bottom: 10px; padding-top: 10px; vertical-align: top;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
													<table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #f0f0f0;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-3" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-11" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" background-color: #000;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style=" font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
														<tr>
															<td class="pad">
																<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 500; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0"><span class="tinyMce-placeholder" style="word-break: break-word;">AEROTACTICO</span></h1>
															</td>
														</tr>
													</table>
													<table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #f0f0f0;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-12" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" background-color: #000;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style=" font-weight: 400; text-align: left; vertical-align: top;">
													<table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style=" word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#ffffff;direction:ltr;font-family:'Inter Tight','Arial';font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center">
																	<p style="margin: 0; margin-bottom: 16px;">2025 Aerotactico</p>
																	<p style="margin: 0; margin-bottom: 16px;">&nbsp;Av. Santamarina 360</p>
																	<p style="margin: 0;">Tandil, Buenos Aires</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table class="social-table" width="72px" border="0" cellpadding="0" cellspacing="0" role="presentation" style=" display: inline-block;">
																		<tr>
																			<td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/" target="_blank"><img src="https://www.instagram.com/aerotactico.tandil/" width="32" height="auto" alt="Instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
																			<td style="padding:0 2px 0 2px;"><a href target="_blank"><img src="https://www.aerotactico-tandil.shop" width="32" height="auto" alt="Web Site" title="Web Site" style="display: block; height: auto; border: 0;"></a></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</body>

</html>`;
};
