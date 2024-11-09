// ==UserScript==
// @name         Better GeoFS NAV Map
// @version      1.0
// @description  Changes the map tiles of GeoFS NAV map
// @author       krunchiekrunch
// @match        https://*.geo-fs.com/geofs.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geo-fs.com
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function() {
    'use strict';

    // tile provider selector (googleHybrid, googleStreets, geofs)
    const tileProvider = 'googleStreets';

    // tile providers
    const tileProviders = {
        googleHybrid: 'https://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        googleStreets: 'https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        geofs: 'https://data2.geo-fs.com/osm/{z}/{x}/{y}.png'
    };

    // wait for geofs to fully load before changing map tile provider
    function waitForGeoFS() {
        if (typeof geofs !== 'undefined' && typeof geofs.osmTileProvider !== 'undefined') {
            changeTileProvider();
        } else {
            setTimeout(waitForGeoFS, 1000);
        }
    }

    function changeTileProvider() {
        if (tileProviders[tileProvider]) {
            geofs.osmTileProvider = tileProviders[tileProvider];
            console.log(`Map tile provider changed to ${tileProvider}`);
        } else {
            console.error(`Tile provider ${tileProvider} is not recognized`);
        }
    }

    waitForGeoFS();
})();
