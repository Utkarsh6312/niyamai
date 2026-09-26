from app.compliance_engine.cases import COMPLIANCE_CASES

def match_case(text: str):
    """
    Scores the extracted text against all predefined cases.
    Returns the best matching case dictionary, or None if no case meets the threshold.
    """
    MINIMUM_MATCH_SCORE = 2
    
    best_case = None
    highest_score = -1
    
    for case in COMPLIANCE_CASES:
        score = 0
        unique_matches = 0
        
        # Check exact policy name match (highest weight)
        if case["policy_name"].lower() in text:
            score += 5
            
        # Check keywords
        for keyword in case["keywords"]:
            if keyword.lower() in text:
                score += 2
                unique_matches += 1
                
        # Only consider cases that meet the threshold
        if score >= MINIMUM_MATCH_SCORE:
            # Deterministic tie-breaking
            if score > highest_score:
                highest_score = score
                best_case = case
            elif score == highest_score and best_case is not None:
                # Tiebreaker 1: Unique matches
                current_best_unique = sum(1 for kw in best_case["keywords"] if kw.lower() in text)
                if unique_matches > current_best_unique:
                    best_case = case
                # Tiebreaker 2: Alphabetical by policy name (if still tied)
                elif unique_matches == current_best_unique:
                    if case["policy_name"] < best_case["policy_name"]:
                        best_case = case

    return best_case
