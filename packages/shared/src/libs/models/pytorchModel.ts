// src/libs/models/pytorchModel.ts
import * as ort from 'onnxruntime-node';

export interface ModelConfig {
  modelPath: string;
  inputShape?: number[];
  outputShape?: number[];
}

export interface PredictionInput {
  teamStats?: any;
  historicalData?: number[][];
  features?: number[];
}

export interface PredictionOutput {
  winProbability: number;
  confidence: number;
  predictedScore?: number;
}

export class PytorchModel {
  private session: ort.InferenceSession | null = null;
  private config: ModelConfig | null = null;

  async loadModel(config: ModelConfig): Promise<void> {
    try {
      this.config = config;
      this.session = await ort.InferenceSession.create(config.modelPath);
      console.log('PyTorch model loaded successfully');
    } catch (error) {
      console.error('Failed to load PyTorch model:', error);
      throw new Error('Model loading failed');
    }
  }

  async predict(inputData: number[][]): Promise<number[]> {
    if (!this.session) {
      throw new Error('Model not loaded. Call loadModel() first.');
    }

    const flatData = inputData.flat();
    const inputTensor = new ort.Tensor(
      'float32',
      new Float32Array(flatData),
      [inputData.length, inputData[0].length]
    );

    const feeds = { input: inputTensor };
    const results = await this.session.run(feeds);
    
    return Array.from(results.output.data as Float32Array);
  }

  async predictGameOutcome(input: PredictionInput): Promise<PredictionOutput> {
    if (!this.session) {
      throw new Error('Model not loaded');
    }

    const features = this.preprocessInput(input);
    const prediction = await this.predict([features]);
    
    return {
      winProbability: Math.max(0, Math.min(1, prediction[0])),
      confidence: Math.max(0, Math.min(1, prediction[1] || 0.5)),
      predictedScore: prediction[2]
    };
  }

  private preprocessInput(input: PredictionInput): number[] {
    // Convert input data to numerical features
    if (input.features) {
      return input.features;
    }

    if (input.teamStats) {
      return this.extractTeamFeatures(input.teamStats);
    }

    if (input.historicalData) {
      return input.historicalData.flat();
    }

    throw new Error('No valid input data provided');
  }

  private extractTeamFeatures(stats: any): number[] {
    // Extract and normalize team statistics
    return [
      stats.wins || 0,
      stats.losses || 0,
      stats.pointsPerGame || 0,
      stats.pointsAllowedPerGame || 0,
      stats.offensiveRating || 0,
      stats.defensiveRating || 0,
      stats.homeWinPercentage || 0,
      stats.awayWinPercentage || 0,
      stats.recentFormScore || 0,
      stats.headToHeadRecord || 0
    ];
  }

  isLoaded(): boolean {
    return this.session !== null;
  }

  async unload(): Promise<void> {
    if (this.session) {
      // ONNX Runtime doesn't have explicit cleanup, but we can null the reference
      this.session = null;
      this.config = null;
      console.log('Model unloaded');
    }
  }

  getModelInfo(): ModelConfig | null {
    return this.config;
  }
}

// Create a singleton instance
export const pytorchModelInstance = new PytorchModel();

// Helper function to initialize the model
export async function initializePytorchModel(modelPath: string): Promise<PytorchModel> {
  const model = new PytorchModel();
  await model.loadModel({ modelPath });
  return model;
}