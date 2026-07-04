const querystring = require('querystring');

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      let game, user_key, device;

      if (req.method === 'GET') {
        const url = new URL(req.url, `http://${req.headers.host}`);
        game = url.searchParams.get('game');
        user_key = url.searchParams.get('user_key');
        device = url.searchParams.get('serial') || url.searchParams.get('device');
      } else {
        const contentType = req.headers['content-type'] || '';

        if (contentType.includes('application/json')) {
          const data = JSON.parse(body);
          game = data.game;
          user_key = data.user_key;
          device = data.serial || data.device;
        } else {
          const data = querystring.parse(body);
          game = data.game;
          user_key = data.user_key;
          device = data.serial || data.device;
        }
      }

      if (!game || !user_key || !device) {
        const response = {
          status: false,
          reason: "USER OR GAME NOT REGISTERED"
        };
        return res.status(200).send(JSON.stringify(response, null, 2));
      }

      if (game === 'FreeFire' && user_key === 'PINOKCRACK') {
        const response = {
          status: true,
          data: {
            real: "FreeFire-PINOKCRACK-5cdf1241eab6b815-" + device,
            token: "3adb0a4f8709d86fc438f4994298aa3e",
            modname: "VIP MOD",
            mod_status: "Safe",
            credit: "MOD STATUS :- 100% SAFE",
            ESP: "on",
            Item: "on",
            AIM: "on",
            SilentAim: "on",
            BulletTrack: "on",
            Floating: "on",
            Memory: "on",
            Setting: "on",
            expired_date: "2029-12-31 23:59:59",
            EXP: "2029-12-31 23:59:59",
            exdate: "2029-12-31 23:59:59",
            device: device,
            rng: 1783141254
          }
        };
        return res.status(200).send(JSON.stringify(response, null, 2));
      } else {
        const response = {
          status: false,
          reason: "USER OR GAME NOT REGISTERED"
        };
        return res.status(200).send(JSON.stringify(response, null, 2));
      }

    } catch (error) {
      const response = {
        status: false,
        reason: "Invalid request"
      };
      return res.status(200).send(JSON.stringify(response, null, 2));
    }
  });
};        } else {
          const data = querystring.parse(body);
          game = data.game;
          user_key = data.user_key;
          device = data.serial || data.device;
        }
      }

      // VALIDASI
      if (!game || !user_key || !device) {
        return res.status(200).json({
          status: false,
          reason: "USER OR GAME NOT REGISTERED"
        });
      }

      // VALIDASI: game = FreeFire, user_key = PINOKCRACK
      if (game === 'FreeFire' && user_key === 'PINOKCRACK') {
        const response = {
          status: true,
          data: {
            real: "FreeFire-PINOKCRACK-5cdf1241eab6b815-" + device,
            token: "3adb0a4f8709d86fc438f4994298aa3e",
            modname: "VIP MOD",
            mod_status: "Safe",
            credit: "MOD STATUS :- 100% SAFE",
            ESP: "on",
            Item: "on",
            AIM: "on",
            SilentAim: "on",
            BulletTrack: "on",
            Floating: "on",
            Memory: "on",
            Setting: "on",
            expired_date: "2029-12-31 23:59:59",
            EXP: "2029-12-31 23:59:59",
            exdate: "2029-12-31 23:59:59",
            device: device,
            rng: 1783141254
          }
        };

        return res.status(200).json(response);
      } else {
        return res.status(200).json({
          status: false,
          reason: "USER OR GAME NOT REGISTERED"
        });
      }

    } catch (error) {
      return res.status(200).json({
        status: false,
        reason: "Invalid request"
      });
    }
  });
};
