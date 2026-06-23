SKILL_LIBRARY = ["Python", "AWS", "FAISS", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "SQL", "Docker", "Kubernetes", "LangChain", "RAG", "OpenAI", "Vector Database"]


def extract_skills_from_jd(jd_text: str):
    found_skills = []

    jd_lower = jd_text.lower()

    for skill in SKILL_LIBRARY:
        if skill.lower() in jd_lower:
            found_skills.append(skill)

    return {"required_skills": found_skills, "preferred_skills": []}