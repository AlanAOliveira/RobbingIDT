import qrcode
representante = ["ED-MM0001"]
img = qrcode.make(representante[0])
type(img)  # qrcode.image.pil.PilImage
img.save(f"{representante[0]}.png")