async function getServerJson() {
    const res = await fetch("https://publicapi.battlebit.cloud/Servers/GetServerList");
    const response: ServerData[] = await res.json();

    return response
}

async function getServerByName(Name: string) {
    const Data = await getServerJson();
    const FoundServer: ServerData | undefined = Data.find(item => item.Name === Name);

    return FoundServer;
}

interface ServerData {
    Name: string,
    Map: string,
    MapSize: string,
    Gamemode: string,
    Region: string,
    Players: number,
    QueuePlayers: number,
    MaxPlayers: number,
    Hz: number,
    DayNight: string,
    IsOfficial: boolean,
    HasPassword: boolean,
    AntiCheat: string,
    Build: string
}

type ServerClass = ServerData;

export { getServerJson, getServerByName, ServerClass };