import qrcode
representante = ["G9215-47050-00"]
img = qrcode.make(representante[0])
type(img)  # qrcode.image.pil.PilImage
img.save(f"{representante[0]}.png")