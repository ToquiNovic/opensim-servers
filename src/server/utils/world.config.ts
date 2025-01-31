import { DBConfig } from '../../config/config';

interface IWorldConfigProps {
    port?: string;
    gridName?: string;
    dataBaseHost?: string;
    dataBaseName?: string;
    dataBaseUser?: string;
    dataBasePassword?: string;
}
const ip = "192.168.1.1"

export function WorldInit({ 
    port = "9000", 
    gridName, 
    dataBaseHost = DBConfig.HOST, 
    dataBaseName,
    dataBaseUser = DBConfig.USER, 
    dataBasePassword = DBConfig.PASS
}: IWorldConfigProps) {
    return `
    ; ### UA3D Configuration File
[Startup]
    ; SmartThreadPool is reported to work well on Mono/Linux, but 
    ; UnsafeQueueUserWorkItem has been benchmarked with better
    ; performance on .NET/Windows
    async_call_method = UnsafeQueueUserWorkItem
    ; recommended: false for mono / true for Windows
    use_async_when_possible =true

[DatabaseService]
    ; ### Set the db_password (again)S
ConnectionString = "Data Source=${dataBaseHost};Database=${dataBaseName};User ID=${dataBaseUser};Password=${dataBasePassword};Old Guids=true;Allow Zero Datetime=true;"

[Network]
    http_listener_port = ${port}

[Hypergrid]
    HomeURI = "http://${ip}:${port}"
    GatekeeperURI = "http://${ip}:${port}"

[GridService]
    Region_test_udla_1 = "DefaultRegion, DefaultHGRegion, FallbackRegion"
    Region_test_udla = "DefaultRegion, DefaultHGRegion, FallbackRegion"

[HGAssetService]
    HomeURI = "http://${ip}:${port}"

[HGInventoryAccessModule]
    ;; If you want to protect your assets from being copied by foreign visitors
    ;; uncomment the next line. You may want to do this on sims that have licensed content.
    ; OutboundPermission = False

[DataSnapshot]
    gridname = "${gridName}"

[UserProfiles]
  ProfileServiceURL = "http://${ip}:${port}"

[LoginService]
    WelcomeMessage = "Welcome to ${gridName}!"

    SRV_HomeURI = "http://${ip}:${port}"    
    SRV_InventoryServerURI = "http://${ip}:${port}"
    SRV_AssetServerURI = "http://${ip}:${port}"
    SRV_FriendsServerURI = "http://${ip}:${port}"
    SRV_IMServerURI = "http://${ip}:${port}"
    SRV_GroupsServerURI = "http://${ip}:${port}"
    SRV_ProfileServerURI = "http://${ip}:${port}"

    ;; For Viewer 2
    MapTileURL = "http://${ip}:${port}/"

[GatekeeperService]
    ;; HG 2.0 access control
    ;; Restrictions on origin of foreign visitors.
    ;; Are foreign visitors allowed?
    ; ForeignAgentsAllowed = true
    ;;
    ;; If ForeignAgentsAllowed is true, make exceptions using AllowExcept.
    ;; Leave blank or commented for no exceptions.
    ; AllowExcept = "http://griefer.com:8002, http://enemy.com:8002"
    ;;
    ;; If ForeignAgentsAllowed is false, make exceptions using DisallowExcept
    ;; Leave blank or commented for no exceptions.
    ; DisallowExcept = "http://myfriendgrid.com:8002, http://myboss.com:8002"

[UserAgentService]
    ;; HG 2.0 access control
    ; User level required to be contacted from other grids
    ;LevelOutsideContacts = 0
    ;; Restrictions on destinations of local users.
    ;; Are local users allowed to visit other grids?
    ;; What user level? Use variables of this forrm:
    ;; ForeignTripsAllowed_Level_<UserLevel> = true | false
    ;; For example:
    ; ForeignTripsAllowed_Level_0 = false
    ; ForeignTripsAllowed_Level_10 = true ; true is default
    ;;
    ;; If ForeignTripsAllowed is true, make exceptions using AllowExcept.
    ;; Leave blank or commented for no exceptions.
    ; AllowExcept_Level_10 = "http://griefer.com:8002, http://enemy.com:8002"
    ;;
    ;; If ForeignTripsAllowed is false, make exceptions using DisallowExcept
    ;; Leave blank or commented for no exceptions.
    ; DisallowExcept_Level_0 = "http://myfriendgrid.com:8002, http://myboss.com:8002"

[GridInfoService]
    login = http://${ip}:${port}/
    gridname = "${gridName}"
    gridnick = "test_udla"
    welcome = http://${ip}:${port}/wifi/welcome.html
    register = http://${ip}:${port}/wifi/user/account
    db_password = http://${ip}:${port}/wifi/forgotpassword
    gatekeeper = http://${ip}:${port}/
    uas = http://${ip}:${port}/

[WifiService]
    GridName = "${gridName}"
    LoginURL = "http://${ip}:${port}"
    WebAddress = "http://${ip}:${port}"
    
    ;; The Wifi Administrator account
    AdminFirst = "Wifi"
    AdminLast = "Admin"
    AdminEmail = "admin@localdb_host"
    AdminPassword = "secret"

    ;; Do you want to be able to control grid registrations?
    AccountConfirmationRequired = true

    ;; Variables for your mail server
    ;; Users will get email notifications from this account.
    Smtpdb_host = "smtp.gmail.com"
    SmtpPort = "587"
    SmtpUsername = "@gmail.com"
    SmtpPassword = ""

    HomeLocation = "${gridName}/128/128/30"

    ;; Who can upload IARs? Set the UserLevel of accounts in order to restrict
    ;; this feature. Default is 0 (everyone can do it)
    ; IARUserLevel = 0


[TOSModule]
    ;; Disabled by default. Disable it if you like by setting this to false
    Enabled = false
    ;; Tell the users what this is about
    Message = "Please read and agree to the Terms of Service"
    ;; Should local users be shown the TOS on first login?
    ShowToLocalUsers = false
    ;; Should foreign users be shown the TOS on first HG login?
    ShowToForeignUsers = true
    ;; Change the text on that page for your own TOS.
    ;; You'll find it under <your diva dir>/WifiPages/tos.html
    TOS_URL = "http://${ip}:${port}/wifi/tos.html"

[Groups]
    GroupsExternalURI = "http://${ip}:${port}"
`;
}
