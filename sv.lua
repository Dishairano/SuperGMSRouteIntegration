-- version check
Citizen.CreateThread(function()
    local vRaw = LoadResourceFile(GetCurrentResourceName(), 'version.json')
    if vRaw and config.versionCheck then
        local v = json.decode(vRaw)
        local url = 'https://raw.githubusercontent.com/Dishairano/SuperGMSRouteIntegration/master/version.json'
        PerformHttpRequest(url, function(code, res)
            if code == 200 then
                local rv = json.decode(res)
                if rv.version ~= v.version then
                    print(([[
-------------------------------------------------------
SuperGMS Route Integration
UPDATE: %s AVAILABLE
CHANGELOG: %s
-------------------------------------------------------
]]):format(rv.version, rv.changelog))
                end
            else
                print('SuperGMS Route Integration was unable to check the version')
            end
        end, 'GET')
    end
end)

function CanPlayerUsecmd(src)
    local retval = true
    ---add your own checkup code here. Or use ACE perms on the command.
    return retval
end

RegisterCommand('RouteIntegrationPlugin', function(source, args)
    local src = source
    local imp = tonumber(args[1])
    local cmd = ""
    for i, k in pairs(args) do
        if i > 1 then
            cmd = cmd .. k .. " "
        end
    end

    if imp ~= nil and GetPlayerPing(imp) ~= 0 and CanPlayerUsecmd(src) then
        TriggerClientEvent('SuperGMS:RouteIntegrationPlugin', imp, cmd)
    end
end)
