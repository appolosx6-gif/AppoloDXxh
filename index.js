module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Hanya menerima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: false,
      reason: "Method Not Allowed. Use POST method."
    });
  }

  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      // Parse body JSON
      const data = JSON.parse(body);
      const { game, user_key, device } = data;

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
            expired_date: "2026-08-03 09:03:51",
            EXP: "2029-08-03 09:03:51",
            exdate: "2029-08-03 09:03:51",
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
        reason: "Invalid JSON format"
      });
    }
  });
};