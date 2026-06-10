export interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
}

const FALLBACK_REPOS: Repo[] = [
  {
    id: 1,
    name: "resume-builder",
    description: "AI-powered resume builder with Gemini AI for smart, customizable resume creation.",
    html_url: "https://github.com/divyal27/resume-builder",
    homepage: "https://resume-builder-xi-three.vercel.app",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["ai", "resume-builder", "gemini", "nextjs"],
    updated_at: "2026-05-17",
  },
  {
    id: 2,
    name: "self-healing-ci-cd-flask-url-shortener",
    description: "Self-healing CI/CD pipeline for Flask URL shortener with GitHub Actions & Python.",
    html_url: "https://github.com/divyal27/self-healing-ci-cd-flask-url-shortener",
    homepage: null,
    language: "Python",
    stargazers_count: 1,
    forks_count: 1,
    topics: ["ci-cd", "self-healing", "flask", "devops"],
    updated_at: "2026-05-04",
  },
  {
    id: 3,
    name: "aiops-log-analyzer",
    description: "AI-driven log analysis and anomaly detection using modern AIOps techniques.",
    html_url: "https://github.com/divyal27/aiops-log-analyzer",
    homepage: null,
    language: "Python",
    stargazers_count: 1,
    forks_count: 0,
    topics: ["aiops", "log-analyzer", "python", "ml"],
    updated_at: "2026-04-09",
  },
  {
    id: 4,
    name: "chatbot-ui",
    description: "Interactive chatbot UI built with TypeScript for conversational AI interfaces.",
    html_url: "https://github.com/divyal27/chatbot-ui",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["chatbot", "typescript", "ui"],
    updated_at: "2026-04-06",
  },
  {
    id: 5,
    name: "ecommerce-microservices",
    description: "Microservices-based e-commerce platform with Kubernetes orchestration.",
    html_url: "https://github.com/divyal27/ecommerce-microservices",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["microservices", "kubernetes", "ecommerce"],
    updated_at: "2026-03-23",
  },
  {
    id: 6,
    name: "devsecops-ai-project",
    description: "DevSecOps pipeline integrating AI-driven security scanning and compliance checks.",
    html_url: "https://github.com/divyal27/devsecops-ai-project",
    homepage: null,
    language: "Shell",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["devsecops", "security", "ai", "ci-cd"],
    updated_at: "2026-05-17",
  },
  {
    id: 7,
    name: "jenkins-ansible-pipeline",
    description: "Jenkins pipeline automation with Ansible for configuration management and deployment.",
    html_url: "https://github.com/divyal27/jenkins-ansible-pipeline",
    homepage: null,
    language: "HCL",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["jenkins", "ansible", "automation"],
    updated_at: "2026-04-23",
  },
  {
    id: 8,
    name: "mario-devops-project",
    description: "Fun Mario-themed DevOps project demonstrating CI/CD with modern tooling.",
    html_url: "https://github.com/divyal27/mario-devops-project",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["devops", "gaming", "ci-cd"],
    updated_at: "2026-03-18",
  },
  {
    id: 9,
    name: "awesome-llm-apps",
    description: "Collection of awesome LLM apps with AI Agents and RAG using OpenAI, Anthropic, Gemini and opensource models.",
    html_url: "https://github.com/divyal27/awesome-llm-apps",
    homepage: "https://www.theunwindai.com",
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: ["llm", "ai-agents", "rag", "openai", "anthropic", "gemini"],
    updated_at: "2025-12-13",
  },
  {
    id: 10,
    name: "gym-management-app",
    description: "Gym management application for managing members, trainers, schedules, and fitness tracking.",
    html_url: "https://github.com/divyal27/gym-management-app",
    homepage: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: ["management", "fitness", "fullstack"],
    updated_at: "2025-11-26",
  },
  {
    id: 11,
    name: "weather-devops-flask",
    description: "Weather app with Flask backend deployed using DevOps best practices.",
    html_url: "https://github.com/divyal27/weather-devops-flask",
    homepage: null,
    language: "HTML",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["flask", "weather", "devops"],
    updated_at: "2026-03-15",
  },
  {
    id: 12,
    name: "flask-url-shortener-devsecops",
    description: "URL shortener built with Flask featuring integrated DevSecOps pipeline.",
    html_url: "https://github.com/divyal27/flask-url-shortener-devsecops",
    homepage: null,
    language: "HTML",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["flask", "devsecops", "url-shortener"],
    updated_at: "2026-03-16",
  },
]

export async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/divyal27/repos?sort=updated&per_page=50"
    )
    if (!res.ok) return FALLBACK_REPOS
    const data = await res.json()
    const repos: Repo[] = data
      .filter((r: any) => r.name !== "divyal27")
      .map((r: any) => ({
        id: r.id,
        name: r.name,
        description: r.description || "No description available.",
        html_url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        topics: r.topics || [],
        updated_at: r.updated_at,
      }))
    return repos.length > 0 ? repos : FALLBACK_REPOS
  } catch {
    return FALLBACK_REPOS
  }
}
