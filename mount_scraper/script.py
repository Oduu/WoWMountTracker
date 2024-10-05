# script to loop over wow head mount page to get images, names, etc and https://www.wowhead.com/mount-collection-tracker#eu-draenor-oduu
# .\Scripts\activate

from bs4 import BeautifulSoup
import json
# import urllib2

# These APIs are shit and don't give full details, need to scrape wow head for the actual data
# curl -u xxxx:xxxx -d grant_type=client_credentials https://oauth.battle.net/token
# {"access_token":"xxxx","token_type":"bearer","expires_in":86399,"sub":"xxxxx"} 


# TODO: Fix source type and location being the same for all mounts

mounts = {}

def read_file():

	with open('freeformatter-out.html', 'r') as f:
		html_string = f.read()
		return html_string

	return False

def extract_text(text, start_char, end_char):
	# Find the next occurrence of the start character
	start = text.find(start_char, 0)

	# Move to the character after start_char
	start += len(start_char)

	# Find the end character after the start character
	end = text.find(end_char, start)

	# Extract the text between start_char and end_char
	return text[start:end]

html_string = read_file()

soup = BeautifulSoup(html_string, 'html.parser')
divs = soup.find_all('div', class_='collection-character-deck-entity')

# Print the found divs
for div in divs:

	a_tag = div.find('a', class_='collection-character-deck-entity-link')
	if a_tag:
		wow_head_link = a_tag.get("href")
		mount_name = a_tag.get_text(strip=True)
		# print(mount_name, wow_head_link)

	inner_div = div.find('div', class_='collection-character-deck-entity-source')
	span = inner_div.find('span', style='color: #FFD200')

	print("---")
	print(inner_div)
	print("---")

	if inner_div:
		try:
			source_location = inner_div.contents[1].strip() if len(inner_div.contents) > 1 else ''    
		except:
			print(f"{mount_name} failed")
			continue

	if span:
		source_type = span.get_text(strip=True)[:-1] if span else ''

	mount_image = None
	anchor_tag = div.find('a', class_='collection-character-deck-entity-model-link')

	if anchor_tag:
		style_attr = anchor_tag.get('style')
		if style_attr:
			mount_image = extract_text(style_attr, '"', '"')

	if source_type == "In-Game Sho":
		source_type = "In-Game Shop"
		source_location = "P2W"

	mounts[mount_name] = {
		"source_type": source_type, 
		"source": source_location,
		"wow_head_link": wow_head_link,
		"image": mount_image
	}


# print(mounts)

with open('data.json', 'w') as f:
	json.dump(mounts, f, indent=4)

