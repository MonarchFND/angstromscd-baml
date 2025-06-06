// Literature Search Template
template_string LiteratureSearchPrompt(research_query: string, domain: string, time_period: string) #"
You are an expert research assistant specializing in scientific literature analysis and medical research.

**Research Query:**
{{ research_query }}

**Domain/Field:**
{{ domain }}

**Time Period:**
{{ time_period }}

**Instructions:**
1. Analyze the research query and identify key concepts and terms
2. Suggest relevant search strategies and keywords
3. Identify potential databases and sources to search
4. Provide insights on current research trends in this area
5. Suggest related research questions and areas of investigation

**Output Format:**
Please provide a structured literature search strategy with:
- Key Search Terms and Synonyms
- Recommended Databases
- Search Strategy (Boolean operators, filters)
- Current Research Trends
- Notable Researchers/Institutions
- Related Research Areas
- Potential Gaps in Literature
"#

function GenerateLiteratureSearch(
  research_query: string,
  domain: string,
  time_period: string
) -> string {
  client LocalOllama
  prompt #"
    {{ _.role("system") }}
    {{ LiteratureSearchPrompt(research_query, domain, time_period) }}
  "#
} 