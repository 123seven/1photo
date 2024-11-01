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

interface PhotoPlan {
  theme: string;
  style: ColorStyleType | null;
  costume: string;
  makeup: string;
  props: string[];
  location: string;
  shots: Shot[];
}

interface ColorStyleType {
  name: string;
  time: string;
  costumes: string[];
  props: string[];
  makeup: string;
  locations: string[];
}

// 定义常量数据

const COLOR_STYLES: Record<string, ColorStyleType[]> = {
  现代: [
    {
      name: "日系清新",
      time: "晴天",
      costumes: [
        "浅色系简洁服装",
        "白色衬衫",
        "碎花连衣裙",
        "棉麻材质吊带裙",
        "平底鞋",
        "小白鞋",
      ],
      props: ["小花束", "日式和风纸伞", "草帽", "小书本"],
      makeup:
        "裸妆效果，轻薄底妆，略带光泽的腮红和唇彩，淡淡的眼妆，清新自然感",
      locations: ["咖啡厅", "公园草坪", "书店", "小巷", "街头便利店"],
    },
    {
      name: "时尚现代",
      time: "均可",
      costumes: [
        "修身西装",
        "皮夹克",
        "廓形大衣",
        "单色连衣裙",
        "尖头高跟鞋",
        "短靴",
      ],
      props: ["咖啡杯", "墨镜", "时尚包包", "手机"],
      makeup: "强调轮廓，深色眼线和眉毛，哑光口红，整体妆感偏冷酷",
      locations: ["城市高楼", "艺术展馆", "玻璃幕墙建筑", "街头时尚地标"],
    },
    {
      name: "暗黑情绪",
      time: "阴夜",
      costumes: ["黑色连衣裙", "长裙", "紧身衣裤", "皮质配饰", "网状元素"],
      props: ["蜡烛", "暗色纱布", "书籍", "镜子"],
      makeup: "深色系妆容，烟熏妆，暗色或哑光红唇，营造神秘感",
      locations: ["废弃工厂", "老旧建筑", "森林深处", "夜晚街头"],
    },
  ],
  复古: [
    {
      name: "复古胶片",
      time: "晴天",
      costumes: [
        "格子衬衫",
        "复古背带裤",
        "毛衣",
        "牛仔裤",
        "复古运动鞋",
        "马丁靴",
      ],
      props: ["胶片相机", "老式手提箱", "老旧书籍"],
      makeup:
        "自然柔和底妆，略带怀旧的粉橘腮红和唇妆，少量睫毛膏，呈现复古胶片效果",
      locations: ["老咖啡馆", "街头涂鸦墙", "旧书店", "公园小径"],
    },
    {
      name: "古风古典",
      time: "均可",
      costumes: ["汉服", "旗袍", "古典长袍", "浅色或深色调"],
      props: ["古典扇子", "书卷", "古风发饰", "瓷器"],
      makeup: "清透底妆，古典眼线妆，淡雅腮红，豆沙色或红色唇妆，搭配古典盘发",
      locations: ["古镇", "古建筑", "园林", "石桥"],
    },
    {
      name: "复古港风",
      time: "均可",
      costumes: ["港式风衣", "格子西装", "丝绸连衣裙", "衬衫", "尖头高跟鞋"],
      props: ["复古皮箱", "老式电话机", "报纸", "红色雨伞"],
      makeup: "哑光妆感，复古红唇，浓黑眼线，深色腮红，港风卷发或短发",
      locations: ["港式茶餐厅", "霓虹街头", "经典建筑楼下", "摩天大楼前"],
    },
  ],
  国外: [
    {
      name: "森系电影",
      time: "晴天",
      costumes: ["棉麻材质长裙", "开衫", "温暖围巾", "轻便平底鞋", "小皮鞋"],
      props: ["小花束", "草帽", "草篮", "木质杯子", "手写信"],
      makeup: "淡妆，自然红晕腮红和轻柔唇妆，极简眼妆，质朴氛围",
      locations: ["森林小径", "木质小屋", "湖边", "自然花田"],
    },
    {
      name: "法式风情",
      time: "均可",
      costumes: [
        "黑色或深色连衣裙",
        "小礼服",
        "宽松毛衣",
        "细带高跟鞋",
        "法式平底鞋",
      ],
      props: ["红酒杯", "复古镜子", "藤编包", "贝雷帽"],
      makeup: "哑光底妆，红色唇妆，稍微卷的眼尾，轻拍腮红，慵懒高雅气质",
      locations: ["街角咖啡馆", "巴黎风情建筑", "石板路", "河边桥畔"],
    },
    {
      name: "美式复古",
      time: "均可",
      costumes: [
        "波点连衣裙",
        "高腰裤",
        "复古T恤",
        "牛仔夹克",
        "粗跟鞋",
        "复古小皮鞋",
      ],
      props: ["老式车", "复古电话", "唱片机", "报纸"],
      makeup: "猫眼眼线，深红唇色，浓密睫毛，复古好莱坞明星妆效",
      locations: ["美式餐厅", "加油站", "旧式旅馆", "公路旁"],
    },
  ],
  其他: [],
};

const LOCATIONS: Record<string, string[]> = {
  自然环境: ["公园", "森林", "海滩", "山地", "湖泊"],
  都市环境: ["街头", "地铁", "天桥", "商圈", "历史建筑"],
  室内场景: ["咖啡厅", "餐厅", "画廊", "工作室", "家居"],
};

const PROPS: string[] = [
  "耳机",
  "各种相机",
  "蝴蝶标本",
  "水果",
  "包装",
  "鲜花",
  "乐器",
  "乐谱",
  "杂志和报纸",
  "泡泡",
  "亮片",
  "玩偶",
  "蛋糕",
  "甜点",
  "冰淇淋",
  "自行车",
  "CD唱片",
  "伞等🌂",
];

const MAKEUPS: string[] = [
  "辣妹妆",
  "干金妆",
  "华丽女主妆",
  "法式妆",
  "韩式女主妆",
  "韩式白开水妆",
  "日杂妆",
  "欧美妆",
  "异域港式妆",
  "清纯港式妆",
  "复古港式妆",
  "西部美式妆",
  "气质女神妆",
  "御姐妆",
  "高知女性妆",
  "意式妆",
];

const PhotoPlanningTool: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [plan, setPlan] = useState<PhotoPlan>({
    theme: "",
    style: null,
    costume: "",
    makeup: "",
    props: [],
    location: "",
    shots: [],
  });

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!plan.style) {
          toast.error("错误提示", {
            description: "请选择拍摄风格选择",
          });
          return false;
        }
        break;
      case 2:
        if (!plan.location) {
          toast.error("错误提示", {
            description: "请选择拍摄地点",
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

            {/* 步骤 1：选择风格 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">选择拍摄风格</h3>
                <Tabs defaultValue="现代">
                  <TabsList className="grid w-full grid-cols-4">
                    {Object.keys(COLOR_STYLES).map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {Object.entries(COLOR_STYLES).map(([category, styles]) => (
                    <TabsContent
                      key={category}
                      value={category}
                      className="mt-4"
                    >
                      <RadioGroup
                        onValueChange={(value: string) => {
                          const data = styles.find(
                            (style) => style.name === value,
                          );
                          if (!data) {
                            return;
                          }
                          setPlan((prev) => ({
                            ...prev,
                            style: data,
                            theme: `${value}人像`,
                          }));
                        }}
                        className="grid grid-cols-2 gap-4"
                      >
                        {styles.map((style) => (
                          <div
                            key={style.name}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={style.name}
                              id={style.name}
                            />
                            <Label htmlFor={style.name}>{style.name}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}

            {/* 步骤 2： 拍摄场景 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">选择拍摄场景</h3>
                {plan.style && (
                  <RadioGroup
                    onValueChange={(value: string) =>
                      setPlan((prev) => ({ ...prev, location: value }))
                    }
                    className="grid grid-cols-2 gap-4"
                  >
                    {plan.style.locations.map((location) => (
                      <div
                        key={location}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={location} id={location} />
                        <Label htmlFor={location}>{location}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {/* <Tabs defaultValue="自然环境">
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
                </Tabs> */}
              </div>
            )}

            {/* 步骤 3：选择服化道 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">选择服化道</h3>
                {plan.style && (
                  <div className="space-y-4">
                    <div>
                      <Label>服装</Label>
                      <RadioGroup
                        onValueChange={(value: string) =>
                          setPlan((prev) => ({ ...prev, costume: value }))
                        }
                        className="grid grid-cols-2 gap-4 mt-2"
                      >
                        {plan.style.costumes.map((location) => (
                          <div
                            key={location}
                            className="flex items-center space-x-2"
                          >
                            {/* <Checkbox value={location} id={location} /> */}
                            <Label htmlFor={location}>{location}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>道具</Label>

                      <RadioGroup
                        onValueChange={(value: string) =>
                          setPlan((prev) => ({ ...prev, costume: value }))
                        }
                        className="grid grid-cols-2 gap-4 mt-2"
                      >
                        {plan.style.props.map((location) => (
                          <div
                            key={location}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={location} id={location} />
                            <Label htmlFor={location}>{location}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>妆造</Label>
                      <Textarea
                        className="mt-2"
                        placeholder="Type your message here."
                        defaultValue={plan.style.makeup}
                        value={plan.makeup}
                        onChange={(e) =>
                          setPlan((prev) => ({
                            ...prev,
                            makeup: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
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
