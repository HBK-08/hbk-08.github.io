## 1 Paper List

### 1.1 VLM Hallucination

| Paper                                                        | Publish      | Experiment Setting                                 | Main Idea or Solved Problems                                 |
| ------------------------------------------------------------ | ------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| Mitigating Hallucinations in Large Vision-Language Models via Causal Route Gating | ICML 2026    | Training-Free; Inference-Time Intervention         | 将 Attention Head 分解为 Visual/Text Routes，估计各 Route 的因果贡献，并选择性抑制干扰决策的 Text Route |
| Dual-Pathway Circuits of Object Hallucination in Vision-Language Models | NeurIPS 2026 | Mechanistic Interpretability; Object Hallucination | 通过 Activation Patching 识别 Grounding/Hallucination Pathways，利用 CPA 分析路径交互及 Polarity Flip |
| REVIS: Sparse Latent Steering to Mitigate Object Hallucination in Large Vision-Language Models | ICML 2026    | Training-Free; Activation Steering                 | 通过 Orthogonal Projection 分离 Visual Direction 与 Language Prior Direction，在关键层动态增强视觉表示 |
| Mitigating Manifold Departure: Uncertainty-Aware Subspace Rectification for Trustworthy MLLM Decoding | ICML 2026    | Training-Free; Subspace Intervention               | 使用 SVD 提取 Language Prior Subspace，根据 Consistency 和 Uncertainty 自适应抑制有害先验 |
| Beyond Attention Imbalance: Mitigating Hallucinations via Spectral Surgery | ICML 2026    | Training-Free; Spectral Intervention               | 分析 Attention 的频谱特征，对 Attention Scores 和 Value Matrices 分别进行频域调制，改善视觉信息利用 |

### 1.2 VLM Latent Thinking Interpretability

| Paper                                                        | Publish      | Experiment Setting                                           | Main Idea or Solved Problems                               |
| ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| Imagination Helps Visual Reasoning, But Not Yet in Latent Space | ICML 2026    | Latent Intervention / Probing / Text-space SFT               | 替换连续向量、篡改文字观察，检验答案如何依赖中间状态       |
| Beyond Visual Memory: Mechanistic Diagnostics of Latent Visual Reasoning | EMNLP 2026   | Component Ablation / Cross-example Swap / Attention Intervention | 移植槽位很少让模型改答供体答案、只留标记仍能保住部分收益。 |
| Visual Latents Know More Than They Say: Unsilencing Latent Reasoning in MLLMs | NeurIPS 2026 | Cross-checkpoint Transfer / Per-query Latent Optimization    | 固定初始模型检验后期向量，测试时逐题优化向量。             |

### 1.3 VLM Compositionality

| Paper                                                        | Publish      | Experiment Setting                             | Main Idea or Solved Problems                                 |
| ------------------------------------------------------------ | ------------ | ---------------------------------------------- | ------------------------------------------------------------ |
| Unveiling the Compositional Ability Gap in Vision-Language Reasoning Model | NeurIPS 2025 | Controlled Evaluation, SFT vs. RL              | 分别训练算面积和找位置，测试从文字迁移到图像（RQ1）、串联两项技能（RQ2），以及改变两项目标后的组合（RQ3）。RL-Ground 训练模型先描述图像，并奖励正确中间步骤。 |
| Rule-Compliant Visual Spatial Planning for Multimodal Large Language Models | ACM MM 2026  | Unseen-Rule Evaluation, Tool-Assisted Planning | 让模型在自然语言规则约束下走迷宫，比较直接生成整条路径与逐步调用感知、执行、验证工具的表现。 |
| Composition-Grounded Data Synthesis for Visual Reasoning     | ICLR 2026    | Compositional Data Synthesis, GRPO             | 把少量图表或网页题拆成读数、比较、计算等操作，换图重组。合成题既有总答案，也有每步的参考答案，可用于训练时给部分正确的推理评分。 |
| CompoDistill: Attention Distillation for Compositional Reasoning in Multimodal LLMs | ICLR 2026    | Knowledge Distillation, Attention Intervention | 让小模型学习教师在作答时关注哪些图像区域，并沿用教师的视觉投影适配器，改善对象、属性及关系的绑定。 |

### 1.4 VLM In-Context Learning

| Paper                                                        | Publish      | Experiment Setting                                           | Main Idea or Solved Problems                                 |
| ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Why Multimodal In-Context Learning Lags Behind? Unveiling the Inner Mechanisms and Bottlenecks | ACL 2026     | Mechanistic Interpretability; Training-Free; Inference-Time Intervention | 将多模态 ICL 拆分为 Task Mapping Construction / Transfer，分析映射传递瓶颈；利用 Demonstration Label-to-Image Attention 引导 Query 使用示例中的视觉证据。 |
| Dissecting Multimodal In-Context Learning: Modality Asymmetries and Circuit Dynamics in modern Transformers | ICML 2026    | Controlled Training; Circuit Analysis; Head Ablation         | 研究数据统计与模型结构如何影响多模态 ICL 的形成，发现新模态可以复用并调整已有的 Induction Circuits。 |
| Multimodal Function Vectors for Visual Relations             | ICML 2026    | Causal Mediation Analysis; Representation Intervention; Frozen Backbone | 定位传递视觉关系信息的 Attention Heads，提取 Function Vectors，通过注入、微调和组合改善关系判断与类比推理。 |
| Criterion-Conditional In-Context Learning: Evaluating Criterion-Shift Adaptation in Vision-Language Models | ICML 2026    | Criterion-Shift Evaluation; Multi-Criterion Training         | 在高层任务不变、判断标准随上下文变化的设置下，评估模型的准则适应能力；提出 CC-Bench、CS / CI 及 Multi-Criterion Training。 |
| In-Context Learning Can Help Vision-Language Models Overcome Training Priors | NeurIPS 2026 | Controlled Evaluation; Prior-Aligned / Prior-Conflicting; Frozen Model | 区分 Visual Capability Deficiency 与 Training Prior Dominance，发现合适的 Demonstrations 能纠正部分先验驱动的错误。 |
| Visual Grounding First, Multimodal In-context Learning Follows | NeurIPS 2026 | Grounding-oriented Post-training; Contrastive RL             | 通过 Proposition-level Contrastive Rewards 增强 Visual Grounding，在不使用 ICL 格式训练数据的情况下改善多模态 ICL，并提出 PICL。 |

## 2 Latent Thinking

### Overview

| 方法                                                    | publish           | Backbone                                                     | 模型与权重                                                   | contributions                                                |
| ------------------------------------------------------- | ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [LVR](https://arxiv.org/abs/2509.24251)                 | ICLR 2026         | Qwen2.5-VL-7B                                                | [LVR-7B，公开](https://huggingface.co/vincentleebang/LVR-7B) | 自回归生成视觉 latent，监督重建问题相关的视觉特征            |
| [Monet](https://arxiv.org/abs/2511.21395)               | CVPR 2026         | Qwen2.5-VL-7B                                                | [Monet-7B，公开](https://huggingface.co/NOVAglow646/Monet-7B) | 三阶段蒸馏式 SFT，并通过 VLPO 强化学习优化连续视觉 latent    |
| [VaLR](https://proceedings.mlr.press/v306/jeon26c.html) | ICML 2026         | Qwen2.5-VL-7B                                                | VaLR-S／VaLR-M，未公开权重                                   | 在每个文字推理步骤前插入视觉对齐 latent，缓解视觉信息遗失；覆盖图像与视频空间推理 |
| [ProLaViT](https://arxiv.org/abs/2607.02907)            | ECCV 2026         | Qwen2.5-VL-7B                                                | ProLaViT，未公开权重                                         | 蒸馏结构化、渐进式视觉思考轨迹，用距离加权多样性损失缓解步骤重复与塌缩 |
| [HyLaR](https://arxiv.org/abs/2604.20328)               | ECCV 2026         | Qwen2.5-VL-7B                                                | [HyLaR-7B，公开](https://huggingface.co/TencentBAC/HyLaR-Qwen2.5-VL-7B) | 交替生成文字与视觉 latent，通过 DePO 分别约束离散与连续动作的策略更新 |
| [CoLVR](https://arxiv.org/abs/2605.08802)               | NeurIPS 2026      | Qwen2.5-VL-7B                                                | [VSP／Jigsaw／Tetris 专用模型，公开](https://huggingface.co/collections/Oscar-dzy/colvr-models) | 结合 latent 对比学习与轨迹对比奖励，增强空间推理中的探索能力 |
| [CoLT](https://arxiv.org/abs/2606.31986)                | ECCV 2026         | Qwen3-VL-8B-Instruct                                         | [CoLT-8B，公开](https://huggingface.co/hulianyuyy/CoLT-8B)   | 用文本 CoT 和逐步监督，将文字推理压缩为连续 latent thought chain |
| [ReaLVR](https://arxiv.org/abs/2609.34563)              | arXiv，2026.09.28 | Qwen2.5-VL-7B；Qwen3-VL-8B／30B-A3B／235B-A22B；InternVL3-8B；Gemma-3-12B | 未公开权重                                                   | 对自由生成的 latent 轨迹施加视觉证据监督，用答案对比确定监督位置、视觉对比确定保留内容 |
| [SwimBird](https://arxiv.org/abs/2602.06040)            | arXiv，2026.02.05 | Qwen3-VL-8B                                                  | [SwimBird-8B，公开](https://huggingface.co/Accio-Lab/SwimBird-8B) | 根据问题动态选择文字、连续视觉 latent 或图文交替推理，并自适应分配 latent 长度 |

### 2.1 LVR（经典 Baseline）

publish：ICLR 2026

backbone：Qwen2.5-VL-7B

模型，LVR-7B，权重公开

contributions：自回归视觉 Latents，监督重建问题相关的视觉特征

### 2.2 Monet（经典 Baseline）

publish：CVPR 2026

backbone：Qwen2.5-VL-7B

模型：Monet-7B，权重公开

contributions：三阶段视觉 Latent 蒸馏，以及 VLPO 强化学习

### 2.3 VaLR

publish：ICML 2026

backbone：Qwen2.5-VL-7B

模型：VaLR-M，权重未公开

contributions：多步推理前插入视觉对齐 Latents，防止视觉信息稀释

performance：

| 方法          | VSI-Bench | BLINK | MMVP | V*   | CVBench |
| ------------- | --------- | ----- | ---- | ---- | ------- |
| Qwen2.5-VL-7B | 33        | 55.7  | 56   | 76.4 | 74.5    |
| LVR           | 18.4      | 52.8  | 59.3 | 81.7 | 76.9    |
| Monet         | 14        | 49.1  | 50   | 83.3 | 71.1    |
| VaLR-S        | 41.5      | 63.1  | 60.3 | 86.4 | 83.1    |
| VaLR-M        | 52.9      | 64.7  | 60.3 | 86.9 | 87.6    |

### 2.4 ProLaViT

publish：ECCV 2026

backbone：Qwen2.5-VL-7B

模型：ProLaViT，权重未公开

contributions：结构化、渐进式 Latent Thoughts，避免多步状态重复或塌缩

performance：

| 方法                | MMVP  | VisPuzzle | V*    | BLINK | 七任务 Avg. |
| ------------------- | ----- | --------- | ----- | ----- | ----------- |
| Qwen2.5-VL-Instruct | 77.33 | 34.75     | 76.44 | 54.49 | 66          |
| Text CoT SFT        | 77.66 | 69.75     | 75.91 | 56.54 | 69.18       |
| LVR                 | 77.3  | 35        | 76.43 | 53.02 | 64.63       |
| One-step Latent     | 79.33 | 72        | 78.01 | 56.28 | 70.85       |
| ProLaViT            | 79    | 74.25     | 80.11 | 57.23 | 75.11       |

### 2.5 HyLaR

publish：ECCV 2026

backbone：Qwen2.5-VL-7B

模型：HyLaR-7B，权重公开

contributions：混合文本与视觉 Latents，通过 DePO 优化连续和离散输出

performance：

| 方法          | V*    | HRBench-4K | HRBench-8K |
| ------------- | ----- | ---------- | ---------- |
| Qwen2.5-VL-7B | 76.44 | 68         | 63.75      |
| Monet         | 80.1  | 67.37      | 64.37      |
| HyLaR-SFT     | 80.63 | 71.5       | 67.19      |
| HyLaR-7B      | 83.77 | 75         | 70.5       |

### 2.6 CoLVR

publish：NeurIPS 2026

backbone：Qwen2.5-VL-7B

模型：CoLVR-VSP / Jigsaw 等，权重公开

contributions：对比学习与轨迹强化学习，增强 Latent 推理的探索能力

CoLVR（NeurIPS 2026）主要关注 Visual Spatial Planning（VSP）和视觉拼图。

| 方法          | VSP Avg. | Jigsaw |
| ------------- | -------- | ------ |
| Qwen2.5-VL-7B | 4.5      | 24     |
| Vanilla SFT   | 59.17    | 67.33  |
| Mirage        | 60       | 70     |
| CoLVR         | 65.83    | 78     |

### 2.7 CoLT

publish：ECCV 2026

backbone：Qwen3-VL-8B

模型：CoLT-8B，权重公开

contributions：把文本 CoT 知识蒸馏到连续 Latent Thought Chain。基于 Qwen3-VL-8B-Instruct，使用文本 Chain-of-Thought（CoT，思维链）作为训练监督，把原本需要多个文字 Token 表达的推理步骤压缩成连续的 Latent Thoughts。

performance：

| 方法                         | 八任务平均准确率 |
| ---------------------------- | ---------------- |
| Qwen3-VL-8B（文本 CoT 对照） | 75.70%           |
| CoLT-8B                      | 79.10%           |

### 2.8 ReaLVR

publish：arXiv, 2026.09.28

backbone：Qwen2.5-VL-7B、Qwen3-VL-8B、Qwen3-VL-30B-A3B、Qwen3-VL-235B-A22B、InternVL3-8B、Gemma 3 12B

模型：权重未公开

contributions：对模型自由生成的 latent 轨迹施加视觉证据监督，利用正确与错误答案的对比确定监督位置，利用相关与不匹配视觉证据的对比确定保留内容。

performance：

使用 Qwen2.5-VL-7B：

| 方法        | MMVP | BLINK | HR-4K | HR-8K | MME-RW | 平均 |
| ----------- | ---- | ----- | ----- | ----- | ------ | ---- |
| LVR-RL      | 64.2 | 53.6  | 69.6  | 64.4  | 50.1   | 60.4 |
| Monet-RL    | 69.9 | 52.4  | 71.3  | 66    | 51.5   | 62.2 |
| ILVR-Stage2 | 69.4 | 56.8  | 71    | 66.9  | 50.3   | 62.9 |
| ReaLVR      | 72   | 55.8  | 71.8  | 66.6  | 52.2   | 63.7 |

 Qwen3-VL Backbone 的结果：

| Backbone     | LVR-RL | ReaLVR |
| ------------ | ------ | ------ |
| Qwen3-VL-8B  | 60.60% | 61.20% |
| Qwen3-VL-30B | 64.10% | 65.20% |

### 2.9 SwimBird

publish：arXiv 2026.09

backbone：Qwen3-VL-8B

模型：

performance：

数据来自 SwimBird 原论文 Table 2，评估的是细粒度、高分辨率视觉理解。

| 模型                   | V*   | HRBench-4K | HRBench-8K | MME-RealWorld | Avg. |
| ---------------------- | ---- | ---------- | ---------- | ------------- | ---- |
| Qwen2.5-VL-7B-Instruct | 75.3 | 65.5       | 62.1       | 56.8          | 64.9 |
| Qwen3-VL-8B-Instruct   | 83.8 | 76.5       | 71.3       | 61.9          | 73.4 |
| DeepEyesV2             | 81.8 | 77.9       | 73.8       | 64.9          | 74.6 |
| SwimBird-8B            | 85.5 | 79         | 74.9       | 65.3          | 76.2 |

## 3 VLM In-Context Learning

## 4 VLM Compositionality

### 4.1 CompoDisdill

## 5 Todo List

1. **Latent Thinking Interpretability：**找到SOTA的真正具有latent visual reasoning能力的VLM和Omni-Model
2. **In-Context Learning：**继续阅读Survey的这几篇paper，并调研目前VLM ICL的SOTA Performance
3. **Compositionality：**找到一个比较好的dataset/benchmark，需要在最新强模型还不能轻松解决。以及阅读CompoDisdill，思考蒸馏之后teacher和student产生gap的机制