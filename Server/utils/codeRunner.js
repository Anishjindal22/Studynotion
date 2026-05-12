const JUDGE0_BASE_URL =
  process.env.JUDGE0_BASE_URL || "https://ce.judge0.com";

const SUPPORTED_LANGUAGES = {
  python: 71,
  cpp: 54,
  java: 62,
};

const STATUS_IN_QUEUE = 1;
const STATUS_PROCESSING = 2;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeLanguage(language) {
  return String(language || "")
    .trim()
    .toLowerCase();
}

function getJudge0Headers() {
  const headers = {
    "Content-Type": "application/json",
  };

  if (process.env.JUDGE0_API_KEY) {
    headers["X-RapidAPI-Key"] = process.env.JUDGE0_API_KEY;
  }

  if (process.env.JUDGE0_API_HOST) {
    headers["X-RapidAPI-Host"] = process.env.JUDGE0_API_HOST;
  }

  return headers;
}

async function judge0Request(path, method, body) {
  const response = await fetch(`${JUDGE0_BASE_URL}${path}`, {
    method,
    headers: getJudge0Headers(),
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await response.text();
    throw new Error(
      `Code execution service returned non-JSON response (status ${response.status}). ` +
      `This usually means the Judge0 API is unreachable or misconfigured.`
    );
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Code execution service error");
  }

  return data;
}

function formatResult(result) {
  return {
    status: result?.status?.description || "Unknown",
    stdout: result?.stdout || "",
    stderr: result?.stderr || "",
    compileOutput: result?.compile_output || "",
    message: result?.message || "",
    executionTime: result?.time || null,
    memory: result?.memory || null,
  };
}

async function executeCode({ language, code, stdin }) {
  const normalizedLanguage = normalizeLanguage(language);
  const languageId = SUPPORTED_LANGUAGES[normalizedLanguage];

  if (!languageId) {
    throw new Error("Unsupported language. Use one of: java, cpp, python");
  }

  const submission = await judge0Request(
    "/submissions?base64_encoded=false&wait=false",
    "POST",
    {
      language_id: languageId,
      source_code: code,
      stdin: stdin || "",
    }
  );

  const maxPollCount = 8;
  for (let pollCount = 0; pollCount < maxPollCount; pollCount += 1) {
    const result = await judge0Request(
      `/submissions/${submission.token}?base64_encoded=false`,
      "GET"
    );

    const statusId = result?.status?.id;
    if (statusId !== STATUS_IN_QUEUE && statusId !== STATUS_PROCESSING) {
      return formatResult(result);
    }

    await sleep(1000);
  }

  throw new Error("Code execution timed out. Please try again.");
}

module.exports = {
  executeCode,
  SUPPORTED_LANGUAGES: Object.keys(SUPPORTED_LANGUAGES),
};
