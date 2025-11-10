#!/usr/bin/env python3
"""
Create an animatic/storyboard video for Frankenstein: First Breath
"""

from PIL import Image, ImageDraw, ImageFont
import subprocess
import os

# Video settings
WIDTH = 1920
HEIGHT = 804  # 2.39:1 aspect ratio (1920/2.39 ≈ 804)
FPS = 24
OUTPUT_DIR = "/tmp/frankenstein_animatic"
OUTPUT_VIDEO = "/home/runner/work/Video/Video/Frankenstein_FirstBreath_Animatic.mp4"

# Create output directory
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Shot data extracted from treatment
shots = [
    {
        "number": "001",
        "timecode": "0:00-0:04",
        "duration": 4,
        "title": "EXT. CASTLE FRANKENSTEIN - NIGHT",
        "description": "Establishing wide shot. Lightning forks across\nstormy sky. Castle silhouette in foreground.\nRain visible in sheets.",
        "camera": "DJI Inspire 3 (Drone)",
        "lens": "24mm",
    },
    {
        "number": "002",
        "timecode": "0:04-0:08",
        "duration": 4,
        "title": "INT. LABORATORY - CREATURE'S TORSO",
        "description": "Extreme close-up of creature's chest under\nwhite sheet. Muscle spasm visible in high-speed.\nSheet is translucent, showing contours.",
        "camera": "ARRI 65 (A-Cam)",
        "lens": "Panavision 40mm Macro",
    },
    {
        "number": "003",
        "timecode": "0:08-0:12",
        "duration": 4,
        "title": "INT. LABORATORY - VICTOR",
        "description": "POV breaks to reveal Victor Frankenstein\nstumbling backwards. Handheld whip-pan captures\nhis expression—split between terror and triumph.",
        "camera": "ARRI 65 (A-Cam)",
        "lens": "35mm Sphero 65",
    },
    {
        "number": "004",
        "timecode": "0:12-0:16",
        "duration": 4,
        "title": "INT. LABORATORY - LIGHTNING STRIKE",
        "description": "48fps slow-motion. Electric spark jumps from\nJacob's ladder to copper electrode on\ncreature's chest. Blue-white plasma arc.",
        "camera": "Phantom Flex4K",
        "lens": "100mm Macro",
    },
    {
        "number": "005",
        "timecode": "0:16-0:20",
        "duration": 4,
        "title": "INT. LABORATORY - CREATURE'S HAND",
        "description": "Macro shot. Fingers curl slowly like a\nnewborn's reflex. Knuckles crack. Sheet begins\nto slip off hand, revealing stitched wrist.",
        "camera": "ARRI 65 (B-Cam)",
        "lens": "50mm Macro",
    },
    {
        "number": "006",
        "timecode": "0:20-0:24",
        "duration": 4,
        "title": "INT. LABORATORY - CREATURE'S EYE",
        "description": "Extreme macro. Milky, clouded eye suddenly\nSNAPS open. Iris contracts from dilated\nto focused. Sclera is bloodshot.",
        "camera": "Laowa 24mm Probe Lens",
        "lens": "18mm Probe",
    },
    {
        "number": "007",
        "timecode": "0:24-0:28",
        "duration": 4,
        "title": "INT. LABORATORY - TWO-SHOT",
        "description": "Steadicam orbits as creature locks eyes with\nVictor. Creature's chest heaves with first\nbreath. Victor frozen in place.",
        "camera": "ARRI 65 (A-Cam)",
        "lens": "35mm Sphero",
    },
    {
        "number": "008",
        "timecode": "0:28-0:32",
        "duration": 4,
        "title": "INT. LABORATORY - ELECTRICAL APPARATUS",
        "description": "Close-up of brass lever arcing violently.\nBlue plasma tendrils crawl across metal surface.\nSparks shower down.",
        "camera": "ARRI 65 (C-Cam)",
        "lens": "85mm Sphero",
    },
    {
        "number": "009",
        "timecode": "0:32-0:38",
        "duration": 6,
        "title": "INT. LABORATORY - VICTOR'S FACE",
        "description": "Slow push-in on Victor's face. Realization\nwashing over him. Rain streams down window\nbehind him.",
        "camera": "ARRI 65 (A-Cam)",
        "lens": "50mm Sphero",
    },
    {
        "number": "010",
        "timecode": "0:38-0:44",
        "duration": 6,
        "title": "INT. LABORATORY - CREATURE RISES",
        "description": "Wide shot. Creature attempts to sit up.\nMetal chains rattle. Neck creaks audibly.\nBody is massive, 7+ feet tall.",
        "camera": "ARRI 65 (A-Cam)",
        "lens": "24mm Sphero",
    },
    {
        "number": "011",
        "timecode": "0:44-0:50",
        "duration": 6,
        "title": "INT. LABORATORY - CREATURE'S MOUTH",
        "description": "Macro of mouth. Black stitches part as lips\nopen. Dark blood drools from corner of mouth.\nDialogue: 'Pain. Why... pain?'",
        "camera": "ARRI 65 (B-Cam)",
        "lens": "100mm Macro",
    },
    {
        "number": "012",
        "timecode": "0:50-0:56",
        "duration": 6,
        "title": "INT. LABORATORY - VICTOR PACES",
        "description": "Tracking shot follows Victor as he grabs\nleather journal, begins scribbling frantically.\nCandles flicker.",
        "camera": "DJI Ronin 4D",
        "lens": "35mm",
    },
    {
        "number": "013",
        "timecode": "0:56-1:02",
        "duration": 6,
        "title": "INT. LABORATORY - CREATURE FALLS",
        "description": "Low angle, Dutch tilt. Creature rips sheet\naway and crashes to wooden floor.\nFloorboards splinter under weight.",
        "camera": "ARRI 65 (A-Cam)",
        "lens": "18mm Sphero",
    },
    {
        "number": "014",
        "timecode": "1:02-1:08",
        "duration": 6,
        "title": "INT. LABORATORY - SHATTERED MIRROR",
        "description": "Over-shoulder of creature. It sees its\nreflection for first time in broken mirror.\nDialogue: '...Man?'",
        "camera": "ARRI 65 (A-Cam)",
        "lens": "50mm Sphero",
    },
    {
        "number": "015",
        "timecode": "1:08-1:14",
        "duration": 6,
        "title": "INT. LABORATORY - DOOR",
        "description": "Heavy wooden door creaks open from wind\npressure. Storm visible through doorway.\nRain blows in.",
        "camera": "ARRI 65 (C-Cam)",
        "lens": "24mm Sphero",
    },
    {
        "number": "016",
        "timecode": "1:14-1:20",
        "duration": 6,
        "title": "INT. LABORATORY - FINAL TABLEAU",
        "description": "Two-shot: Victor edges toward door, eyes on\ncreature. Creature remains focused on its\nreflection. Neither moves.",
        "camera": "ARRI 65 (A-Cam)",
        "lens": "40mm Sphero",
    },
    {
        "number": "017",
        "timecode": "1:20-1:30",
        "duration": 10,
        "title": "TITLE CARD",
        "description": "Black screen. Silence for 2 seconds.\nWhite serif text fades in center frame:\n'FRANKENSTEIN: FIRST BREATH'",
        "camera": "N/A",
        "lens": "N/A",
    },
    {
        "number": "018",
        "timecode": "1:30-2:00",
        "duration": 30,
        "title": "END CREDITS",
        "description": "Credits roll over timelapse of lightning storm.\nCastle silhouette in foreground.\nViolin sustains and slowly fades.",
        "camera": "Timelapse",
        "lens": "24mm",
    },
]


def create_shot_frame(shot, frame_type="main"):
    """Create a frame for a shot"""
    
    # Color scheme: teal/orange gothic horror
    bg_color = (15, 25, 30)  # Dark teal-black
    title_color = (255, 200, 100)  # Orange
    text_color = (200, 220, 230)  # Light blue-gray
    accent_color = (0, 150, 180)  # Teal accent
    
    # Create image
    img = Image.new('RGB', (WIDTH, HEIGHT), bg_color)
    draw = ImageDraw.Draw(img)
    
    if frame_type == "title":
        # Opening title card
        try:
            title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 80)
            subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 40)
        except:
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
        
        # Draw title
        title_text = "FRANKENSTEIN:\nFIRST BREATH"
        bbox = draw.textbbox((0, 0), title_text, font=title_font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (WIDTH - text_width) // 2
        y = (HEIGHT - text_height) // 2 - 80
        
        # Draw with slight shadow
        draw.text((x+3, y+3), title_text, fill=(0, 0, 0), font=title_font, align='center')
        draw.text((x, y), title_text, fill=title_color, font=title_font, align='center')
        
        # Subtitle
        subtitle = "A 2-Minute Cinematic Short"
        bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
        text_width = bbox[2] - bbox[0]
        x = (WIDTH - text_width) // 2
        draw.text((x, y + 180), subtitle, fill=text_color, font=subtitle_font)
        
        # Specs at bottom
        specs = "8K RAW | 2.39:1 Anamorphic | Dolby Atmos 7.1.4"
        bbox = draw.textbbox((0, 0), specs, font=subtitle_font)
        text_width = bbox[2] - bbox[0]
        x = (WIDTH - text_width) // 2
        draw.text((x, HEIGHT - 80), specs, fill=accent_color, font=subtitle_font)
        
    elif frame_type == "end":
        # End credits
        try:
            credit_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
            small_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
        except:
            credit_font = ImageFont.load_default()
            small_font = ImageFont.load_default()
        
        credits = [
            ("FRANKENSTEIN: FIRST BREATH", title_color, credit_font, True),
            ("", text_color, small_font, False),
            ("A Production Treatment", text_color, credit_font, False),
            ("", text_color, small_font, False),
            ("Based on Mary Shelley's Novel", text_color, small_font, False),
            ("", text_color, small_font, False),
            ("Technical Specifications", accent_color, credit_font, False),
            ("ARRI ALEXA 65 + Panavision Sphero 65", text_color, small_font, False),
            ("8K RAW | 2.39:1 Anamorphic", text_color, small_font, False),
            ("Dolby Atmos 7.1.4 Sound Mix", text_color, small_font, False),
            ("", text_color, small_font, False),
            ("Runtime: 2:00 | 18 Shots", text_color, small_font, False),
            ("", text_color, small_font, False),
            ("© 2024", text_color, small_font, False),
        ]
        
        y = 100
        for text, color, font, bold in credits:
            if text:
                bbox = draw.textbbox((0, 0), text, font=font)
                text_width = bbox[2] - bbox[0]
                x = (WIDTH - text_width) // 2
                if bold:
                    draw.text((x+1, y+1), text, fill=(0, 0, 0), font=font)
                draw.text((x, y), text, fill=color, font=font)
            y += 45
            
    else:
        # Regular shot frame
        try:
            shot_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
            title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 36)
            desc_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 28)
            tech_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 22)
        except:
            shot_font = ImageFont.load_default()
            title_font = ImageFont.load_default()
            desc_font = ImageFont.load_default()
            tech_font = ImageFont.load_default()
        
        # Top bar with shot number and timecode
        draw.rectangle([0, 0, WIDTH, 100], fill=(20, 35, 45))
        shot_text = f"SHOT {shot['number']}"
        draw.text((40, 30), shot_text, fill=title_color, font=shot_font)
        
        timecode_text = shot['timecode']
        bbox = draw.textbbox((0, 0), timecode_text, font=title_font)
        text_width = bbox[2] - bbox[0]
        draw.text((WIDTH - text_width - 40, 35), timecode_text, fill=accent_color, font=title_font)
        
        # Shot title
        y = 140
        draw.text((40, y), shot['title'], fill=title_color, font=title_font)
        
        # Description
        y = 200
        for line in shot['description'].split('\n'):
            draw.text((40, y), line, fill=text_color, font=desc_font)
            y += 38
        
        # Technical specs at bottom
        y = HEIGHT - 120
        draw.rectangle([0, y - 20, WIDTH, HEIGHT], fill=(20, 35, 45))
        
        tech_text = f"Camera: {shot['camera']}  |  Lens: {shot['lens']}"
        draw.text((40, y), tech_text, fill=accent_color, font=tech_font)
        
        # Progress bar
        progress_y = HEIGHT - 30
        progress_width = int((WIDTH - 80) * (int(shot['number']) / 18))
        draw.rectangle([40, progress_y, WIDTH - 40, progress_y + 15], fill=(40, 50, 60))
        draw.rectangle([40, progress_y, 40 + progress_width, progress_y + 15], fill=accent_color)
    
    return img


def main():
    print("Creating Frankenstein: First Breath Animatic...")
    print(f"Output directory: {OUTPUT_DIR}")
    
    frame_count = 0
    
    # Create opening title (3 seconds)
    print("Creating opening title...")
    title_frames = FPS * 3
    title_img = create_shot_frame(None, frame_type="title")
    for i in range(title_frames):
        title_img.save(f"{OUTPUT_DIR}/frame_{frame_count:05d}.png")
        frame_count += 1
    
    # Create frames for each shot
    for shot in shots[:-1]:  # All shots except end credits
        print(f"Creating frames for Shot {shot['number']}...")
        shot_img = create_shot_frame(shot)
        num_frames = FPS * shot['duration']
        
        for i in range(num_frames):
            shot_img.save(f"{OUTPUT_DIR}/frame_{frame_count:05d}.png")
            frame_count += 1
    
    # Create end credits (use last shot data)
    print("Creating end credits...")
    end_shot = shots[-1]
    end_img = create_shot_frame(None, frame_type="end")
    num_frames = FPS * end_shot['duration']
    for i in range(num_frames):
        end_img.save(f"{OUTPUT_DIR}/frame_{frame_count:05d}.png")
        frame_count += 1
    
    print(f"Total frames created: {frame_count}")
    
    # Create video using ffmpeg
    print("Encoding video with ffmpeg...")
    
    ffmpeg_cmd = [
        "ffmpeg",
        "-y",  # Overwrite output file
        "-framerate", str(FPS),
        "-i", f"{OUTPUT_DIR}/frame_%05d.png",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "18",  # High quality
        "-pix_fmt", "yuv420p",
        "-vf", f"scale={WIDTH}:{HEIGHT}",
        OUTPUT_VIDEO
    ]
    
    result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
    
    if result.returncode == 0:
        print(f"\n✓ Video created successfully!")
        print(f"  Location: {OUTPUT_VIDEO}")
        
        # Get file size
        size_mb = os.path.getsize(OUTPUT_VIDEO) / (1024 * 1024)
        print(f"  Size: {size_mb:.2f} MB")
        
        # Get duration
        duration = frame_count / FPS
        print(f"  Duration: {int(duration // 60)}:{int(duration % 60):02d}")
        
    else:
        print("Error creating video:")
        print(result.stderr)
        return 1
    
    # Cleanup
    print("\nCleaning up temporary files...")
    subprocess.run(["rm", "-rf", OUTPUT_DIR])
    
    print("\n✓ Animatic creation complete!")
    return 0


if __name__ == "__main__":
    exit(main())
