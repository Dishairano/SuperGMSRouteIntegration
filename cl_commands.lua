-- optimizations
local ipairs = ipairs
local upper = string.upper
local format = string.format
-- end optimizations

---
--- [[ Nearest Postal Commands ]] ---
---

TriggerEvent('chat:addSuggestion', '/postcode', 'Zet een GPS marker naar een locatie waar u heen wil', {{
    name = 'Postcode',
    help = 'De postcode waar u naartoe wilt.'
}})

RegisterCommand('postcode', function(_, args)
    if #args < 1 then
        if pBlip then
            RemoveBlip(pBlip.hndl)
            pBlip = nil
            TriggerEvent('SuperGMS-NotifyScript:sendNotify', 'Waarschuwing</br>De route is verwijderd van uw CityGIS.',
                'warn')
        end
        return
    end

    local userPostal = upper(args[1])
    local foundPostal

    for _, p in ipairs(postals) do
        if upper(p.code) == userPostal then
            foundPostal = p
            break
        end
    end

    if foundPostal then
        if pBlip then
            RemoveBlip(pBlip.hndl)
        end
        local blip = AddBlipForCoord(foundPostal[1][1], foundPostal[1][2], 0.0)
        pBlip = {
            hndl = blip,
            p = foundPostal
        }
        SetBlipRoute(blip, true)
        SetBlipSprite(blip, config.blip.sprite)
        SetBlipColour(blip, config.blip.color)
        SetBlipRouteColour(blip, config.blip.color)
        BeginTextCommandSetBlipName('STRING')
        AddTextComponentSubstringPlayerName(format(config.blip.blipText, pBlip.p.code))
        EndTextCommandSetBlipName(blip)

        TriggerEvent('SuperGMS-NotifyScript:sendNotify',
            'Succes</br>Routebeschrijving succesvol geimplementeerd in het CityGIS', 'success')
    else
        TriggerEvent('SuperGMS-NotifyScript:sendNotify',
            'Error</br>Routebeschrijving onseccesvol vestuurd naar het CityGIS', 'error')
    end
end)

RegisterCommand('SendFunctionGMS', function(source, args)
    local src = source
    local imp = tonumber(args[1])
    local cmd = ""
    for i, k in pairs(args) do
        if i > 1 then
            cmd = cmd .. k .. " "
        end
    end

    if imp ~= nil and GetPlayerPing(imp) ~= 0 then
        TriggerClientEvent('SuperGMS:SendFunction', imp, cmd)
    end
end)

RegisterCommand("errornotify", function()
    TriggerEvent('SuperGMS-NotifyScript:sendNotify', 'Error</br>Example Error Notify!', 'error')
end)

RegisterCommand("infonotify", function()
    TriggerEvent('SuperGMS-NotifyScript:sendNotify', 'Information</br>Example Info Notify', 'info')
end)

RegisterCommand("successnotify", function()
    TriggerEvent('SuperGMS-NotifyScript:sendNotify', 'Success</br>Example Success Notify', 'success')
end)

RegisterCommand("warnnotify", function()
    TriggerEvent('SuperGMS-NotifyScript:sendNotify', 'Warning</br>Example Warn Notify.', 'warn')
end)

RegisterCommand("longnotify", function()
    TriggerEvent('SuperGMS-NotifyScript:sendNotify',
        'Success</br>This is first line from long notify message. </br>This is second line from long notify message.',
        'success')
end)
