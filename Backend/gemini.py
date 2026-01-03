from dotenv import load_dotenv
import os
from google import genai
from PIL import Image
import io

# Load environment variables
load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    raise RuntimeError("GOOGLE_API_KEY is not set")

client = genai.Client(api_key=API_KEY)


def detect_issue(image_bytes: bytes) -> str:
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    prompt = """
Return ONLY one label:
pothole
garbage
water_leak
street_light
electric_transformer
unknown
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[prompt, image]
    )

    text = (response.text or "").lower()

    if "pothole" in text:
        return "pothole"
    elif "garbage" in text:
        return "garbage"
    elif "water" in text:
        return "water_leak"
    elif "light" in text:
        return "street_light"
    elif "electric_transformer" in text:
        return "electric_transformer"
    else:
        return "unknown"