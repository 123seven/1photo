"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// 定义接口类型
interface Shot {
  description: string;
  angle: string;
  action: string;
  expression: string;
  emotion: string;
}

interface Style {
  color: string;
  lighting: string;
  composition: string;
}

interface PhotoPlan {
  theme: string;
  style: Style;
  location: string;
  shots: Shot[];
}

// 定义常量数据
const THEMES: string[] = [
  "人像写真",
  "街头随拍",
  "风景",
  "美食",
  "建筑",
  "生活日常",
  "活动记录",
];

const COLOR_STYLES: string[] = [
  "明亮清新",
  "暖色调",
  "冷色调",
  "黑白",
  "复古",
  "高饱和",
];

const LIGHTING_EFFECTS: string[] = [
  "自然光",
  "顺光",
  "逆光",
  "侧光",
  "暗调",
  "高调",
];

const COMPOSITIONS: string[] = [
  "对称构图",
  "三分法",
  "中心构图",
  "引导线",
  "框架构图",
  "散景",
];

const LOCATIONS: Record<string, string[]> = {
  自然环境: ["公园", "森林", "海滩", "山地", "湖泊"],
  都市环境: ["街头", "地铁", "天桥", "商圈", "历史建筑"],
  室内场景: ["咖啡厅", "餐厅", "画廊", "工作室", "家居"],
};

const ANGLES: string[] = ["平视", "俯视", "仰视", "侧拍", "特写"];

const PhotoPlanningTool: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [plan, setPlan] = useState<PhotoPlan>({
    theme: "",
    style: {
      color: "",
      lighting: "",
      composition: "",
    },
    location: "",
    shots: [],
  });

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!plan.theme) {
          toast.error("错误提示", {
            description: "请选择拍摄主题",
          });
          return false;
        }
        break;
      case 2:
        if (
          !plan.style.color ||
          !plan.style.lighting ||
          !plan.style.composition
        ) {
          toast.error("错误提示", {
            description: "请完成所有风格选择",
          });
          return false;
        }
        break;
      case 3:
        if (!plan.location) {
          toast.error("错误提示", {
            description: "请选择拍摄地点",
          });
          return false;
        }
        break;
      case 4:
        if (plan.shots.length === 0) {
          toast.error("错误提示", {
            description: "请至少添加一个分镜",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleAddShot = (): void => {
    setPlan((prev) => ({
      ...prev,
      shots: [
        ...prev.shots,
        {
          description: "",
          angle: "",
          action: "",
          expression: "",
          emotion: "",
        },
      ],
    }));
  };

  const handleShotChange = (
    index: number,
    field: keyof Shot,
    value: string,
  ): void => {
    const newShots = [...plan.shots];
    newShots[index] = {
      ...newShots[index],
      [field]: value,
    };
    setPlan((prev) => ({
      ...prev,
      shots: newShots,
    }));
  };

  const nextStep = (): void => setCurrentStep((prev) => prev + 1);
  const prevStep = (): void => setCurrentStep((prev) => prev - 1);

  const handleStyleChange = (field: keyof Style, value: string): void => {
    setPlan((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (): void => {
    console.log("Final plan:", plan);
    // 这里可以添加提交逻辑
  };

  const handleNextStep = (): void => {
    if (validateStep()) {
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>摄影拍摄策划工具</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 步骤指示器 */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    step <= currentStep ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2  font-medium
                    ${
                      step <= currentStep
                        ? "border-primary bg-primary text-white dark:text-gray-800"
                        : "border-gray-300 dark:text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-full h-1 mx-2 ${
                        step < currentStep ? "bg-primary" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* 步骤 1：选择主题 */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">选择拍摄主题</h3>
                <RadioGroup
                  onValueChange={(value: string) =>
                    setPlan((prev) => ({ ...prev, theme: value }))
                  }
                  className="grid grid-cols-2 gap-4"
                >
                  {THEMES.map((theme) => (
                    <div key={theme} className="flex items-center space-x-2">
                      <RadioGroupItem value={theme} id={theme} />
                      <Label htmlFor={theme}>{theme}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* 步骤 2：选择风格 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">选择拍摄风格</h3>
                <div className="space-y-4">
                  <div>
                    <Label>色彩风格</Label>
                    <Select
                      onValueChange={(value: string) =>
                        handleStyleChange("color", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择色彩风格" />
                      </SelectTrigger>
                      <SelectContent>
                        {COLOR_STYLES.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>光影效果</Label>
                    <Select
                      onValueChange={(value: string) =>
                        handleStyleChange("lighting", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择光影效果" />
                      </SelectTrigger>
                      <SelectContent>
                        {LIGHTING_EFFECTS.map((effect) => (
                          <SelectItem key={effect} value={effect}>
                            {effect}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>构图方式</Label>
                    <Select
                      onValueChange={(value: string) =>
                        handleStyleChange("composition", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择构图方式" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPOSITIONS.map((comp) => (
                          <SelectItem key={comp} value={comp}>
                            {comp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* 步骤 3：选择场地 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">选择拍摄地点</h3>
                <Tabs defaultValue="自然环境">
                  <TabsList className="grid w-full grid-cols-3">
                    {Object.keys(LOCATIONS).map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {Object.entries(LOCATIONS).map(([category, places]) => (
                    <TabsContent key={category} value={category}>
                      <RadioGroup
                        onValueChange={(value: string) =>
                          setPlan((prev) => ({ ...prev, location: value }))
                        }
                        className="grid grid-cols-2 gap-4"
                      >
                        {places.map((place) => (
                          <div
                            key={place}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={place} id={place} />
                            <Label htmlFor={place}>{place}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}

            {/* 步骤 4：添加分镜 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">规划分镜</h3>
                <Button onClick={handleAddShot} className="w-full">
                  添加新分镜
                </Button>
                {plan.shots.map((shot, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="font-medium mb-4">分镜 {index + 1}</h4>
                    <div className="space-y-4">
                      <div>
                        <Label>镜头描述</Label>
                        <Textarea
                          value={shot.description}
                          onChange={(e) =>
                            handleShotChange(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="描述这个镜头想要表达的内容..."
                        />
                      </div>
                      <div>
                        <Label>拍摄角度</Label>
                        <Select
                          onValueChange={(value: string) =>
                            handleShotChange(index, "angle", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择拍摄角度" />
                          </SelectTrigger>
                          <SelectContent>
                            {ANGLES.map((angle) => (
                              <SelectItem key={angle} value={angle}>
                                {angle}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>动作指导</Label>
                        <Textarea
                          value={shot.action}
                          onChange={(e) =>
                            handleShotChange(index, "action", e.target.value)
                          }
                          placeholder="描述拍摄对象需要做什么动作..."
                        />
                      </div>
                      <div>
                        <Label>表情/情绪</Label>
                        <Textarea
                          value={shot.expression}
                          onChange={(e) =>
                            handleShotChange(
                              index,
                              "expression",
                              e.target.value,
                            )
                          }
                          placeholder="描述需要表达的情绪或表情..."
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* 导航按钮 */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button onClick={prevStep} variant="outline">
                  上一步
                </Button>
              )}
              {currentStep < 4 ? (
                <Button onClick={handleNextStep} className="ml-auto">
                  下一步
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="ml-auto">
                  完成策划
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoPlanningTool;
