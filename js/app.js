// Open Weather Map
// https://openweathermap.org/

$(function() {
    // 定数
    var API_KEY = 'd0aef5f25899f79a23c93e7b66b6c913';
    var URL = 'https://api.openweathermap.org/data/2.5/weather?appid=' + API_KEY + '&units=metric';

    /**
     * 天気を取得し、htmlに表示
     * @param {*} $elm 
     * @param {*} url 
     */
    function getWeather($elm, url) {
        $.ajax({
            url: url,
            dataType: 'json',
        }).done(function(data) {
            console.log(data);
            $elm.append(
                  '<div>場所名: ' + data.name + '</div>'
                + '<div>温度　: ' + data.main.temp + '</div>'
                + '<div>天気　: ' + data.weather[0].main + '</div>'
            );
        });
    }


    // 郵便番号から取得
    var $weatherZip = $('#weather-zip');
    var zip = '333-0864';
    getWeather($weatherZip, URL + '&zip=' + zip + ',jp');

    // 緯度経度から取得
    var $weatherLatlon = $('#weather-latlon');
    var lat = '35.67';
    var lon = '139.71';
    getWeather($weatherLatlon, URL + '&lat=' + lat + '&lon=' + lon);


    // --- おまけ（緯度経度を自動で取得して天気を表示） ---


    if (navigator.geolocation) {
        // Geolocation APIに対応している
        alert("この端末では位置情報が取得できます");
        getPosition();
    } else {
        // Geolocation APIに対応していない
        alert("この端末では位置情報が取得できません");
    }
      
    // 現在地取得処理
    function getPosition() {
        // 現在地を取得
        navigator.geolocation.getCurrentPosition(function(position) {
            // 取得成功した場合
            var lat = position.coords.latitude;
            var lot = position.coords.longitude;
            var $weatherOmake = $('#weather-omake')
            getWeather($weatherOmake, URL + '&lat=' + lat + '&lon=' + lon);
        
        }, function(error) {
            // 取得失敗した場合
            switch(error.code) {
                case 1: //PERMISSION_DENIED
                    alert("位置情報の利用が許可されていません");
                break;
                case 2: //POSITION_UNAVAILABLE
                    alert("現在位置が取得できませんでした");
                break;
                case 3: //TIMEOUT
                    alert("タイムアウトになりました");
                break;
                default:
                    alert("その他のエラー(エラーコード:" + error.code + ")");
                break;
            }
        });
    }
});