const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const database = require("./config/database");
const { connectRedis } = require("./config/redis");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dns = require("dns");


const rawDnsServers = process.env.DNS_SERVERS;
if (typeof rawDnsServers === "string" && rawDnsServers.trim().length > 0) {
	const servers = rawDnsServers
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);

	if (servers.length > 0) {
		try {
			dns.setServers(servers);
			console.log("DNS override enabled:", servers);
		} catch (e) {
			console.error("Invalid DNS_SERVERS value; expected comma-separated IPs", e.message);
			process.exit(1);
		}
	}
}

const PORT = process.env.PORT || 4000;
const rawTrustProxyLevel = process.env.TRUST_PROXY_LEVEL;

if (typeof rawTrustProxyLevel === "string" && rawTrustProxyLevel.trim().length > 0) {
	const parsedTrustProxyLevel = Number(rawTrustProxyLevel);
	app.set("trust proxy", Number.isFinite(parsedTrustProxyLevel) ? parsedTrustProxyLevel : rawTrustProxyLevel);
} else {
	app.set("trust proxy", 1);
}

const allowedOrigins = [
	process.env.FRONTEND_URL,
	process.env.CLIENT_URL,
	"http://localhost:3000",
	"http://127.0.0.1:3000",
	"http://localhost:5173",
	"http://127.0.0.1:5173",
	"https://tutor-master-five.vercel.app",
	"https://tutor-master-anishjindal22s-projects.vercel.app"
].filter(Boolean);

database.connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: function (origin, callback) {
			const isLocalOrigin =
				typeof origin === "string" &&
				/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

			if (
				!origin ||
				isLocalOrigin ||
				allowedOrigins.length === 0 ||
				allowedOrigins.includes(origin)
			) {
				return callback(null, true);
			}

			return callback(new Error("Not allowed by CORS"));
		},
		credentials: true,
	})
)

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp",
	})
)
cloudinaryConnect();

const basePort = Number(PORT) || 4000;

function startServer(portToUse) {
	const server = app
		.listen(portToUse, () => {
			console.log(`Server started on port ${portToUse}`);
		})
		.on("error", (error) => {
			if (error.code === "EADDRINUSE") {
				console.warn(`Port ${portToUse} in use, trying ${portToUse + 1}`);
				startServer(portToUse + 1);
				return;
			}

			throw error;
		});

	return server;
}

async function bootstrapRoutes() {
	await connectRedis();

	const userRoutes = require("./routes/User");
	const profileRoutes = require("./routes/Profile");
	const paymentRoutes = require("./routes/Payments");
	const courseRoutes = require("./routes/Course");
	const codeExecutionRoutes = require("./routes/CodeExecution");
	const notificationRoutes = require("./routes/Notification");
	const adminRoutes = require("./routes/Admin");

	app.use("/api/v1/auth", userRoutes);
	app.use("/api/v1/profile", profileRoutes);
	app.use("/api/v1/course", courseRoutes);
	app.use("/api/v1/payment", paymentRoutes);
	app.use("/api/v1/code", codeExecutionRoutes);
	app.use("/api/v1/notification", notificationRoutes);
	app.use("/api/v1/admin", adminRoutes);

	app.get("/", (req, res) => {
		return res.json({
			success: true,
			message: 'Your server is up and running....'
		});
	});

	startServer(basePort);
	require("./workers/notificationWorkers").startNotificationWorkers();
}

bootstrapRoutes().catch((error) => {
	console.error("Bootstrap routes failed:", error.message);
	process.exit(1);
});
