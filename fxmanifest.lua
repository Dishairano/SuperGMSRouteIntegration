local postalFile = 'new-postals.json'

fx_version 'cerulean'
games {'gta5'}
lua54 "yes"

author 'SuperGMS'
description ''
version '1.0.0'
url 'https://github.com/Dishairano/SuperGMSRouteIntergration/'

client_scripts {'config.lua', 'cl.lua', 'cl_commands.lua', 'cl_render.lua'}

server_scripts {'config.lua', 'sv.lua'}

file(postalFile)
postal_file(postalFile)

files {
    'html/index.html',
    'html/ui.css',
    'html/ui.js',
    'html/intuition.mp3',
    'version.json'
}
