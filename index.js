module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Hanya terima POST
  if (req.method !== 'POST') {
    const response = {
      status: false,
      reason: "Use POST method"
    };
    return res.status(200).send(JSON.stringify(response, null, 2));
  }

  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      // Parse data dari body
      let game, user_key, device;

      // Coba parse sebagai JSON dulu
      try {
        const data = JSON.parse(body);
        game = data.game;
        user_key = data.user_key;
        device = data.serial || data.device;
      } catch (e) {
        // Kalau bukan JSON, parse sebagai query string (form data)
        const params = new URLSearchParams(body);
        game = params.get('game');
        user_key = params.get('user_key');
        device = params.get('serial') || params.get('device');
      }

      // Validasi: cek apakah game, user_key, dan device ada
      if (!game || !user_key || !device) {
        const response = {
          status: false,
          reason: "USER OR GAME NOT REGISTERED"
        };
        return res.status(200).send(JSON.stringify(response, null, 2));
      }

      // Validasi data: game harus FreeFire, user_key PINOKCRACK
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
        reason: "Invalid request: " + error.message
      };
      return res.status(200).send(JSON.stringify(response, null, 2));
    }
  });
};
