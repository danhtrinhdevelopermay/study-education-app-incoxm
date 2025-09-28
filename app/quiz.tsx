
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";

export default function QuizScreen() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const subjects = [
    { name: "Mathematics", emoji: "📐", color: "#007AFF", questions: 10 },
    { name: "Science", emoji: "🔬", color: "#34C759", questions: 8 },
    { name: "Languages", emoji: "📚", color: "#FF9500", questions: 12 },
    { name: "History", emoji: "🏛️", color: "#AF52DE", questions: 6 },
  ];

  const sampleQuestions = [
    {
      question: "What is the result of 2 + 2 × 3?",
      options: ["8", "10", "12", "6"],
      correct: 0,
      explanation: "Following order of operations (PEMDAS), multiplication comes before addition: 2 + (2 × 3) = 2 + 6 = 8"
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correct: 1,
      explanation: "Mercury is the closest planet to the Sun in our solar system."
    },
    {
      question: "What is the past tense of 'go'?",
      options: ["goed", "went", "gone", "going"],
      correct: 1,
      explanation: "The past tense of 'go' is 'went'. This is an irregular verb."
    },
  ];

  const startQuiz = (subject: string) => {
    setSelectedSubject(subject);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    console.log(`Starting ${subject} quiz`);
  };

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setSelectedSubject(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    const getScoreEmoji = () => {
      if (percentage >= 90) return "🏆";
      if (percentage >= 70) return "🎉";
      if (percentage >= 50) return "👍";
      return "📚";
    };

    return (
      <>
        <Stack.Screen
          options={{
            title: "Quiz Results",
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={styles.backButton}>
                <IconSymbol name="chevron.left" color="#007AFF" />
              </Pressable>
            ),
          }}
        />
        <View style={styles.container}>
          <View style={styles.resultsContainer}>
            <IconCircle
              emoji={getScoreEmoji()}
              backgroundColor="#007AFF20"
              size={100}
            />
            <Text style={styles.resultsTitle}>Quiz Complete!</Text>
            <Text style={styles.scoreText}>
              You scored {score} out of {sampleQuestions.length}
            </Text>
            <Text style={styles.percentageText}>{percentage}%</Text>
            
            <View style={styles.scoreBreakdown}>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreNumber}>{score}</Text>
                <Text style={styles.scoreLabel}>Correct</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={[styles.scoreNumber, { color: '#FF3B30' }]}>
                  {sampleQuestions.length - score}
                </Text>
                <Text style={styles.scoreLabel}>Incorrect</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreNumber}>{sampleQuestions.length}</Text>
                <Text style={styles.scoreLabel}>Total</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <Button
                variant="primary"
                onPress={restartQuiz}
                style={styles.actionButton}
              >
                Take Another Quiz
              </Button>
              <Button
                variant="outline"
                onPress={() => router.back()}
                style={styles.actionButton}
              >
                Back to Home
              </Button>
            </View>
          </View>
        </View>
      </>
    );
  }

  if (quizStarted && selectedSubject) {
    const question = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

    return (
      <>
        <Stack.Screen
          options={{
            title: `${selectedSubject} Quiz`,
            headerLeft: () => (
              <Pressable onPress={restartQuiz} style={styles.backButton}>
                <IconSymbol name="xmark" color="#007AFF" />
              </Pressable>
            ),
          }}
        />
        <View style={styles.container}>
          <View style={styles.quizHeader}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {currentQuestion + 1} of {sampleQuestions.length}
              </Text>
            </View>
          </View>

          <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.questionText}>{question.question}</Text>
            
            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === index && styles.selectedOption
                  ]}
                  onPress={() => selectAnswer(index)}
                >
                  <View style={styles.optionContent}>
                    <View style={[
                      styles.optionCircle,
                      selectedAnswer === index && styles.selectedCircle
                    ]}>
                      <Text style={[
                        styles.optionLetter,
                        selectedAnswer === index && styles.selectedLetter
                      ]}>
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>
                    <Text style={[
                      styles.optionText,
                      selectedAnswer === index && styles.selectedOptionText
                    ]}>
                      {option}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <View style={styles.bottomContainer}>
            <Button
              variant="primary"
              onPress={nextQuestion}
              disabled={selectedAnswer === null}
              style={styles.nextButton}
            >
              {currentQuestion === sampleQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Quiz",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" color="#007AFF" />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconCircle
            emoji="🧠"
            backgroundColor="#007AFF20"
            size={80}
          />
          <Text style={styles.title}>Test Your Knowledge</Text>
          <Text style={styles.subtitle}>
            Choose a subject and challenge yourself with a quick quiz
          </Text>
        </View>

        <View style={styles.subjectsContainer}>
          <Text style={styles.sectionTitle}>Select a Subject</Text>
          {subjects.map((subject, index) => (
            <Pressable
              key={index}
              style={[styles.subjectCard, { borderLeftColor: subject.color }]}
              onPress={() => startQuiz(subject.name)}
            >
              <IconCircle
                emoji={subject.emoji}
                backgroundColor={subject.color + "20"}
                size={50}
              />
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectQuestions}>
                  {subject.questions} questions • 5 minutes
                </Text>
              </View>
              <IconSymbol name="chevron.right" color="#ccc" size={20} />
            </Pressable>
          ))}
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Quiz Tips</Text>
          <View style={styles.tipItem}>
            <IconSymbol name="lightbulb" color="#FF9500" size={20} />
            <Text style={styles.tipText}>Read each question carefully</Text>
          </View>
          <View style={styles.tipItem}>
            <IconSymbol name="clock" color="#007AFF" size={20} />
            <Text style={styles.tipText}>Take your time, there&apos;s no rush</Text>
          </View>
          <View style={styles.tipItem}>
            <IconSymbol name="star" color="#34C759" size={20} />
            <Text style={styles.tipText}>Learn from explanations after each question</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    padding: 6,
  },
  header: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  subjectsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  subjectCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  subjectInfo: {
    flex: 1,
    marginLeft: 16,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subjectQuestions: {
    fontSize: 14,
    color: '#666',
  },
  tipsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  // Quiz screen styles
  quizHeader: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 30,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e5e5e5',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF05',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  selectedCircle: {
    backgroundColor: '#007AFF',
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  selectedLetter: {
    color: 'white',
  },
  optionText: {
    fontSize: 18,
    color: '#1a1a1a',
    flex: 1,
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  nextButton: {
    width: '100%',
  },
  // Results screen styles
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  percentageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 30,
  },
  scoreBreakdown: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 40,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    width: '100%',
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
});
