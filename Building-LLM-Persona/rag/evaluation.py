import transformers
import os
from bert_score import score

IS_RESCALE = True
MODEL_TYPE = "microsoft/deberta-xlarge-mnli"
DIR = os.path.dirname(__file__)
GROUND_TRUTH = os.path.join(DIR, "./gta.txt")
BASELINE_OUTPUT = os.path.join(DIR, "./formatted_answers_baseline.txt")
LLM_PROMPTED_OUTPUT = os.path.join(DIR, "./formatted_answers_prompt.txt")
RAG_OUTPUT = os.path.join(DIR, "./output-openai.txt")


def evaluation():
    with open(GROUND_TRUTH) as f:
        gtas = [line.strip() for line in f]

    with open(LLM_PROMPTED_OUTPUT) as f:
        ans_p = [line.strip() for line in f]

    with open(BASELINE_OUTPUT) as f:
        ans_b = [line.strip() for line in f]

    with open(RAG_OUTPUT) as f:
        rags = [line.strip() for line in f]

    print(f"Ground truth answers length: {len(gtas)}")
    print(f"RAG answers length: {len(rags)}")

    # Results for LLM + RAG
    # When you are running this cell for the first time,
    # it will download the BERT model which will take relatively longer.
    rag_p, rag_r, rag_f1 = score(cands=rags, refs=gtas, lang="en", rescale_with_baseline=IS_RESCALE,
                                 verbose=True)

    print(f"F1 of RAG answers: {rag_f1}")

    print(f"System level F1 score of RAG answers: {rag_f1.mean():.3f}")
    print(f"System level precision of RAG answers: {rag_p.mean():.3f}")
    print(f"System level recall of RAG answers: {rag_r.mean():.3f}")

    sp_P, sp_R, sp_F1 = score(cands=ans_p, refs=gtas, lang="en", rescale_with_baseline=IS_RESCALE,
                              verbose=True)

    print(f"LLM with system prompt answers F1: {sp_F1}")

    print(f"System level F1 score of LLM with system prompt answers: {sp_F1.mean():.3f}")
    print(f"System level precision of LLM with system prompt answers: {sp_P.mean():.3f}")
    print(f"System level recall of LLM with system prompt answers: {sp_R.mean():.3f}")

    baseline_p, baseline_r, baseline_f1 = score(cands=ans_b, refs=gtas, lang="en", rescale_with_baseline=IS_RESCALE,
                                                verbose=True)

    print(f"Baseline LLM answers F1: {baseline_f1}")

    print(f"System level F1 score of baseline LLM answers: {baseline_f1.mean():.3f}")
    print(f"System level precision of baseline LLM answers: {baseline_p.mean():.3f}")
    print(f"System level recall of baseline LLM answers: {baseline_r.mean():.3f}")


evaluation()
