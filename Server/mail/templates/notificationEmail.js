exports.notificationEmail = (name, title, message) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
                color: #000814;
            }
            
            .body {
                font-size: 16px;
                margin-bottom: 20px;
                text-align: left;
                background-color: #f3f4f6;
                padding: 20px;
                border-radius: 8px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 30px;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://Tutor Master.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png"
                    alt="Tutor Master Logo"></a>
            <div class="message-title">${title}</div>
            <p>Hi ${name},</p>
            <div class="body">
                <p>${message}</p>
            </div>
            <a class="cta" href="https://Tutor Master.vercel.app/dashboard/notifications">View in Dashboard</a>
            
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                    href="mailto:hello@Tutor Master.com">hello@Tutor Master.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`;
};
