var bweInterop = {};

bweInterop.getPosition = async function () {
    function getPositionAsync() {
        return new Promise((source, error) => {
            navigator.geolocation.getCurrentPosition(source, error);
        });
    }

    if (navigator.geolocation) {
        var position = await getPositionAsync();

        var coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        return coords;
    } else {
        throw Error("Geolocation is not supported by this browser.");
    }
}