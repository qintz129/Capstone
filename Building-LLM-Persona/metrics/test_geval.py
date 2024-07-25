from deepeval import assert_test
from deepeval.test_case import LLMTestCase,LLMTestCaseParams
from deepeval.metrics import GEval
from dotenv import load_dotenv
import os
import csv

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')

# Load data from files
def load_data(file_name):
    with open(file_name, encoding='ISO-8859-1') as f:
        return [line.strip() for line in f]

# Load all datasets
gtas = load_data("gta.txt")
ans_p = load_data("formatted_answers_prompt_4o.txt")
ans_b = load_data("formatted_answers_baseline_4o.txt")
rags = load_data("output_RAG_openai_240720.txt")
questions = load_data("questions.txt")

# Define metrics with detailed configuration
metrics = {
    "Coherence": GEval(
        name="Coherence",
        criteria="Evaluate the structure and organization of the response, comparing it to the expected output to ensure a natural and logical progression of thoughts.",
        evaluation_steps=[
            "Review both the actual output and the expected output to identify key topics and information structure.",
            "Assess how well the actual output's structure and sequence of information align with those of the expected output.",
            "Determine the logical flow and connections between ideas in the actual output, comparing these with the expected output to ensure coherence.",
            "Score the coherence on a scale from 1 to 5, where higher scores reflect closer alignment with the expected output's organization and clarity."
        ],
        evaluation_params=[LLMTestCaseParams.INPUT, LLMTestCaseParams.ACTUAL_OUTPUT, LLMTestCaseParams.EXPECTED_OUTPUT]
    ),
    "Consistency": GEval(
        name="Consistency",
        criteria="Check the consistency of the actual output against the expected output, ensuring that all statements in the actual output are supported by the expected output.",
        evaluation_steps=[
            "Compare the actual output with the expected output to verify factual accuracy and alignment.",
            "Identify any discrepancies or 'hallucinated' facts in the actual output that are not present in the expected output.",
            "Penalize any factual errors or unsupported statements found in the actual output.",
            "Assign a consistency score from 1 to 5, with higher scores given to outputs that show no factual deviations from the expected output."
        ],
        evaluation_params=[LLMTestCaseParams.INPUT, LLMTestCaseParams.ACTUAL_OUTPUT, LLMTestCaseParams.EXPECTED_OUTPUT]
    ),
    "Relevancy": GEval(
        name="Relevancy",
        criteria="Measure how relevant and concise the actual output is in comparison to the expected output, focusing on the essence of the query.",
        evaluation_steps=[
            "Analyze both the actual and expected outputs to discern the core themes and points.",
            "Evaluate whether the actual output directly addresses the main aspects of the expected output without straying into irrelevance or redundancy.",
            "Assess the succinctness of the actual output, ensuring it does not include unnecessary details that are absent in the expected output.",
            "Rate relevancy on a scale from 1 to 5, where higher scores denote a higher degree of relevance and conciseness as compared to the expected output."
        ],
        evaluation_params=[LLMTestCaseParams.INPUT, LLMTestCaseParams.ACTUAL_OUTPUT, LLMTestCaseParams.EXPECTED_OUTPUT]
    )
}

# Function to evaluate all test cases for a specific model output set
def evaluate_all(model_outputs, model_name):
    results = []
    for idx, question in enumerate(questions):
        test_case = LLMTestCase(
            input=question,
            actual_output=model_outputs[idx],
            expected_output=gtas[idx]
        )
        result = {
            'Model': model_name,
            'Outputs': model_outputs[idx],
            'Metrics': {}
        }
        for metric_name, metric in metrics.items():
            metric.measure(test_case)
            result['Metrics'][metric_name] = {
                'Score': metric.score,
                'Reason': metric.reason
            }
        results.append(result)
    return results

# Function to calculate and print average scores for each metric
def print_average_scores(results):
    if not results:
        print("No results to process.")
        return

    averages = {}
    total_scores = {metric: 0 for metric in metrics}
    num_cases = len(results)

    # Sum all scores for each metric
    for result in results:
        for metric, data in result['Metrics'].items():
            total_scores[metric] += data['Score']

    # Calculate averages
    for metric, total in total_scores.items():
        averages[metric] = total / num_cases

    # Print the averages
    model_name = results[0]['Model']
    print(f"Average scores for {model_name}:")
    for metric, avg_score in averages.items():
        print(f"{metric}: {avg_score:.2f}")

def print_results(results):
    for result in results:
        print(f"Model: {result['Model']}")
        print("Metrics Results:")
        for metric_name, metric_data in result['Metrics'].items():
            print(f"  {metric_name}:")
            print(f"    Score: {metric_data['Score']}")
            print(f"    Reason: {metric_data['Reason']}")
        print("\n")  # Adds a newline for better readability between results

def save_results_to_csv(results_b, results_p, results_rags, questions, gtas):
    with open('evaluation_results_4o.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # Write the header
        writer.writerow([
            'Question', 'Ground Truth Answer', 
            'Baseline Answer', 'Baseline Coherence Score', 'Baseline Coherence Reason',
            'Baseline Consistency Score', 'Baseline Consistency Reason', 'Baseline Relevancy Score', 'Baseline Relevancy Reason', 
            'Prompt Answer', 'Prompt Coherence Score', 'Prompt Coherence Reason',
            'Prompt Consistency Score', 'Prompt Consistency Reason', 'Prompt Relevancy Score', 'Prompt Relevancy Reason', 
            'RAG Answer', 'RAG Coherence Score', 'RAG Coherence Reason',
            'RAG Consistency Score', 'RAG Consistency Reason', 'RAG Relevancy Score', 'RAG Relevancy Reason'
        ])

        # Iterate over each question and corresponding results
        for idx, question in enumerate(questions):
            # Extract the actual outputs for each model configuration
            baseline_output = results_b[idx]['Outputs']
            prompt_output = results_p[idx]['Outputs']
            rag_output = results_rags[idx]['Outputs']

            # Collecting scores and reasons
            baseline_scores_and_reasons = [(data['Score'], data['Reason']) for metric, data in results_b[idx]['Metrics'].items()]
            prompt_scores_and_reasons = [(data['Score'], data['Reason']) for metric, data in results_p[idx]['Metrics'].items()]
            rag_scores_and_reasons = [(data['Score'], data['Reason']) for metric, data in results_rags[idx]['Metrics'].items()]

            # Flatten the list of tuples for writing to CSV
            baseline_flat = [item for sublist in baseline_scores_and_reasons for item in sublist]
            prompt_flat = [item for sublist in prompt_scores_and_reasons for item in sublist]
            rag_flat = [item for sublist in rag_scores_and_reasons for item in sublist]

            # Write the row
            writer.writerow([
                question, gtas[idx], baseline_output] + baseline_flat +
                [prompt_output] + prompt_flat +
                [rag_output] + rag_flat
            )


# Evaluate all configurations
results_ans_b = evaluate_all(ans_b, "LLM without Prompt")
results_ans_p = evaluate_all(ans_p, "LLM with Prompt")
results_rags = evaluate_all(rags, "RAG")

# Assume results_ans_b is already evaluated and stored
print_results(results_ans_b)
print_results(results_ans_p)
print_results(results_rags)

# Calculate and print average scores for each set of results
print_average_scores(results_ans_b)
print_average_scores(results_ans_p)
print_average_scores(results_rags)

# Save the results to a CSV file
save_results_to_csv(results_ans_b, results_ans_p, results_rags, questions, gtas)