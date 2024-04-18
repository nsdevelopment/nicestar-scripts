resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

ui_page('nui/ui.html')

client_scripts {
	'Common.Client.net.dll',
	'Seatbelt.Client.net.dll',
}

files {
	'nui/ui.html',
	'nui/script.js',
	'nui/img/seatbelt.png',
	'nui/sounds/*.ogg',
}
