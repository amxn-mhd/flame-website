from PIL import Image

def make_clean_transparent(img_path, output_path):
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Lower threshold: if R, G, B are all > 140, make it fully transparent.
        # This catches anti-aliased light-grey/white pixels inside letter loops.
        if item[0] > 140 and item[1] > 140 and item[2] > 140:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Cleaned {img_path} with lower threshold")

make_clean_transparent("assets/flame-logo.png", "assets/flame-logo.png")
make_clean_transparent("assets/mla-initiative.png", "assets/mla-initiative.png")
