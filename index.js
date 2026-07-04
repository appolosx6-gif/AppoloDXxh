const querystring = require('querystring');

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
        return res.status(200).json({
          status: false,
          reason: "USER OR GAME NOT REGISTERED"
        });
      }

      if (game === 'FreeFire' && user_key === 'axpmod') {
        return res.status(200).json({
          status: true,
          data: {
            real: `FreeFire-axpmod-5cdf1241eab6b815-${device}`,
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
            expired_date: "2029-12-31 23:59:59",   // ← DIUBAH KE 2029
            EXP: "2029-12-31 23:59:59",            // ← DIUBAH KE 2029
            exdate: "2029-12-31 23:59:59",         // ← DIUBAH KE 2029
            device: device,
            rng: 1783141254
          }
        });
      } else {
        return res.status(200).json({
          status: false,
          reason: "USER OR GAME NOT REGISTERED"
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        reason: "Invalid request format"
      });
    }
  });
};          game = data.game;
          user_key = data.user_key;
          device = data.serial || data.device;
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
          // POST Form Data (x-www-form-urlencoded)
          const data = querystring.parse(body);
          game = data.game;
          user_key = data.user_key;
          device = data.serial || data.device;
        } else {
          // Coba parse sebagai query string juga
          const data = querystring.parse(body);
          game = data.game;
          user_key = data.user_key;
          device = data.serial || data.device;
        }
      }

      // Validasi: cek apakah game, user_key, dan device ada
      if (!game || !user_key || !device) {
        return res.status(200).json({
          status: false,
          reason: "USER OR GAME NOT REGISTERED"
        });
      }

      // Validasi data: game harus FreeFire, user_key axpmod
      if (game === 'FreeFire' && user_key === 'PINOKCRACK') {
        return res.status(200).json({
          status: true,
          data: {
            real: `FreeFire-PINOKCRACK-5cdf1241eab6b815-${device}`,
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
            expired_date: "2026-08-03 09:03:51",
            EXP: "2026-08-03 09:03:51",
            exdate: "2026-08-03 09:03:51",
            device: device,
            rng: 1783141254
          }
        });
      } else {
        return res.status(200).json({
          status: false,
          reason: "USER OR GAME NOT REGISTERED"
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        reason: "Invalid request format"
      });
    }
  });
};
