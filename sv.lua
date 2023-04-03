-- version check
Citizen.CreateThread(function()
    local vRaw = LoadResourceFile(GetCurrentResourceName(), 'version.json')
    if vRaw and config.versionCheck then
        local v = json.decode(vRaw)
        local url = 'https://raw.githubusercontent.com/Dishairano/SuperGMSRouteIntergration/main/version.json'
        PerformHttpRequest(url, function(code, res)
            if code == 200 then
                local rv = json.decode(res)
                if rv.version ~= v.version then
                    print(([[
-------------------------------------------------------
SuperGMS Route Intergration
UPDATE: %s AVAILABLE
CHANGELOG: %s
-------------------------------------------------------
]]):format(rv.version, rv.changelog))
                end
            else
                print('Het SuperGMS kon de versie van het script niet controleren.')
            end
        end, 'GET')
    end
end)

RegisterNetEvent('SuperGMS:SendFunction', function(cmd)
    ExecuteCommand(cmd)
end)

RegisterNetEvent('SuperGMS-NotifyScript:sendNotify')
AddEventHandler('SuperGMS-NotifyScript:sendNotify', function(message, type)
    if type then
        SendNUIMessage({
            name = 'addNotification',
            type = type,
            message = message
        })
    else
        SendNUIMessage({
            name = 'addNotification',
            type = nil,
            message = message
        })
    end
end)
