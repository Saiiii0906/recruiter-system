def build_semantic_profile(profile: dict) -> str:
    return f"""
Headline:
{profile.get("headline","")}

Summary:
{profile.get("summary","")}

Current Title:
{profile.get("current_title","")}

Industry:
{profile.get("current_industry","")}
"""