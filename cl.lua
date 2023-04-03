---@class PostalData : table<number, vec>
---@field code string
---@type table<number, PostalData>
postals = nil
Citizen.CreateThread(function()
    postals = LoadResourceFile(GetCurrentResourceName(), GetResourceMetadata(GetCurrentResourceName(), 'postal_file'))
    postals = json.decode(postals)
    for i, postal in ipairs(postals) do
        postals[i] = {
            vec(postal.x, postal.y),
            code = postal.code
        }
    end
end)

---@class NearestResult
---@field code string
---@field dist number
nearest = nil

---@class PostalBlip
---@field 1 vec
---@field p PostalData
---@field hndl number
pBlip = nil

exports('getPostal', function()
    return nearest and nearest.code or nil
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
