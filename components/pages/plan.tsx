"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

interface Style {
  name: string;
  tags: string[];
  image: string;
}

const styles: Record<string, Style> = {
  日系清新: {
    name: "日系清新",
    tags: ["文艺", "小清新", "明亮"],
    image: "/api/placeholder/300/200",
  },
  时尚现代: {
    name: "时尚现代",
    tags: ["潮流", "都市", "高级感"],
    image: "/api/placeholder/300/200",
  },
  暗黑情绪: {
    name: "暗黑情绪",
    tags: ["氛围感", "低饱和", "戏剧性"],
    image: "/api/placeholder/300/200",
  },
  复古胶片: {
    name: "复古胶片",
    tags: ["怀旧", "胶片感", "复古"],
    image: "/api/placeholder/300/200",
  },
  古风古典: {
    name: "古风古典",
    tags: ["传统", "汉服", "古韵"],
    image: "/api/placeholder/300/200",
  },
  复古港风: {
    name: "复古港风",
    tags: ["复古", "胶片感", "氛围感"],
    image: "/api/placeholder/300/200",
  },
  森系电影: {
    name: "森系电影",
    tags: ["氛围感"],
    image: "/api/placeholder/300/200",
  },
  法式风情: {
    name: "法式风情",
    tags: ["文艺", "明亮"],
    image: "/api/placeholder/300/200",
  },
  美式复古: {
    name: "美式复古",
    tags: ["胶片感", "明亮"],
    image: "/api/placeholder/300/200",
  },
};
type styleName = keyof typeof styles;

interface Shot {
  description: string;
  angle: string;
  action: string;
  expression: string;
  emotion: string;
}

const StepNames = {
  1: "风格",
  2: "地点",
  3: "服化道",
  4: "分镜",
};

const allTags = Array.from(
  new Set(Object.values(styles).flatMap((style) => style.tags)),
);

const locations: Record<styleName, string[]> = {
  日系清新: ["公园", "咖啡馆", "图书馆", "花园", "书店", "小巷", "街头便利店"],
  时尚现代: [
    "商业街",
    "艺术馆",
    "时尚工作室",
    "都市街头",
    "城市高楼",
    "艺术展馆",
    "玻璃幕墙建筑",
    "街头时尚地标",
  ],
  暗黑情绪: [
    "废弃工厂",
    "黑暗角落",
    "地下停车场",
    "老旧建筑",
    "老旧建筑",
    "森林深处",
    "夜晚街头",
  ],
  复古胶片: [
    "老街",
    "复古小店",
    "火车站",
    "老式公寓",
    "老咖啡馆",
    "街头涂鸦墙",
    "旧书店",
    "公园小径",
  ],
  古风古典: ["古建筑", "园林", "茶室", "戏楼", "古镇", "石桥"],
  复古港风: ["港式茶餐厅", "霓虹街头", "经典建筑楼下", "摩天大楼前"],
  森系电影: ["森林小径", "木质小屋", "湖边", "自然花田"],
  法式风情: ["街角咖啡馆", "巴黎风情建筑", "石板路", "河边桥畔"],
  美式复古: ["美式餐厅", "加油站", "旧式旅馆", "公路旁"],
};

const costumes: Record<styleName, string[]> = {
  日系清新: [
    "浅色系简洁服装",
    "白色衬衫",
    "碎花连衣裙",
    "棉麻材质吊带裙",
    "平底鞋",
    "小白鞋",
  ],
  时尚现代: [
    "修身西装",
    "皮夹克",
    "廓形大衣",
    "单色连衣裙",
    "尖头高跟鞋",
    "短靴",
  ],
  暗黑情绪: ["黑色连衣裙", "长裙", "紧身衣裤", "皮质配饰", "网状元素"],
  复古胶片: [
    "格子衬衫",
    "复古背带裤",
    "毛衣",
    "牛仔裤",
    "复古运动鞋",
    "马丁靴",
  ],
  古风古典: ["汉服", "旗袍", "古典长袍", "浅色或深色调"],
  复古港风: ["港式风衣", "格子西装", "丝绸连衣裙", "衬衫", "尖头高跟鞋"],
  森系电影: ["棉麻材质长裙", "开衫", "温暖围巾", "轻便平底鞋", "小皮鞋"],
  法式风情: [
    "黑色或深色连衣裙",
    "小礼服",
    "宽松毛衣",
    "细带高跟鞋",
    "法式平底鞋",
  ],
  美式复古: [
    "波点连衣裙",
    "高腰裤",
    "复古T恤",
    "牛仔夹克",
    "粗跟鞋",
    "复古小皮鞋",
  ],
};

const props: Record<styleName, string[]> = {
  日系清新: ["小花束", "日式和风纸伞", "草帽", "小书本"],
  时尚现代: ["咖啡杯", "墨镜", "时尚包包", "手机"],
  暗黑情绪: ["黑色连衣裙", "长裙", "紧身衣裤", "皮质配饰", "网状元素"],
  复古胶片: ["胶片相机", "老式手提箱", "老旧书籍"],
  古风古典: ["古典扇子", "书卷", "古风发饰", "瓷器"],
  复古港风: ["复古皮箱", "老式电话机", "报纸", "红色雨伞"],
  森系电影: ["小花束", "草帽", "草篮", "木质杯子", "手写信"],
  法式风情: ["红酒杯", "复古镜子", "藤编包", "贝雷帽"],
  美式复古: ["老式车", "复古电话", "唱片机", "报纸"],
};

const makeups: Record<styleName, string> = {
  日系清新: "裸妆效果，轻薄底妆，略带光泽的腮红和唇彩，淡淡的眼妆，清新自然感",
  时尚现代: "强调轮廓，深色眼线和眉毛，哑光口红，整体妆感偏冷酷",
  暗黑情绪: "深色系妆容，烟熏妆，暗色或哑光红唇，营造神秘感",
  复古胶片:
    "自然柔和底妆，略带怀旧的粉橘腮红和唇妆，少量睫毛膏，呈现复古胶片效果",
  古风古典: "清透底妆，古典眼线妆，淡雅腮红，豆沙色或红色唇妆，搭配古典盘发",
  复古港风: "哑光妆感，复古红唇，浓黑眼线，深色腮红，港风卷发或短发",
  森系电影: "淡妆，自然红晕腮红和轻柔唇妆，极简眼妆，质朴氛围",
  法式风情: "哑光底妆，红色唇妆，稍微卷的眼尾，轻拍腮红，慵懒高雅气质",
  美式复古: "猫眼眼线，深红唇色，浓密睫毛，复古好莱坞明星妆效",
};

const ANGLES: string[] = ["平视", "俯视", "仰视", "侧拍", "特写"];

const PhotoPlanningTool = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState<styleName>("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCostumes, setSelectedCostumes] = useState<string[]>([]);
  const [selectedProps, setSelectedProps] = useState<string[]>([]);
  const [makeup, setMakeup] = useState(makeups[selectedStyle] || "");
  const [shots, setShots] = useState<Shot[]>([]);

  const handleAddShot = (): void => {
    setShots([
      ...shots,
      { description: "", angle: "", action: "", emotion: "", expression: "" },
    ]);
  };

  const handleShotChange = (
    index: number,
    field: keyof Shot,
    value: string,
  ): void => {
    const newShots = [...shots];
    newShots[index] = {
      ...newShots[index],
      [field]: value,
    };
    setShots(newShots);
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold dark:text-white">选择拍摄风格</h2>
      <div className="flex  flex-wrap gap-2">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="cursor-pointer dark:hover:bg-slate-700 dark:text-slate-200"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(styles).map((style) => (
          <Card
            key={style.name}
            className={`cursor-pointer transition-all dark:bg-slate-800 dark:border-slate-700
              ${
                selectedStyle === style.name
                  ? "ring-2 ring-primary dark:ring-primary-foreground"
                  : ""
              }
              hover:shadow-lg dark:hover:shadow-slate-700`}
            onClick={() => {
              setSelectedStyle(style.name);
              setMakeup(makeups[style.name] || "");
            }}
          >
            <CardContent className="p-0">
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 p-4">
              <h3 className="font-semibold dark:text-white">{style.name}</h3>
              <div className="flex gap-2 flex-wrap">
                {style.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="dark:bg-slate-700 dark:text-slate-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold dark:text-white">选择拍摄场景</h2>
      {selectedStyle && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations[selectedStyle].map((location) => (
            <Card
              key={location}
              className={`cursor-pointer transition-all dark:bg-slate-800 dark:border-slate-700
                ${
                  selectedLocation === location
                    ? "ring-2 ring-primary dark:ring-primary-foreground"
                    : ""
                }
                hover:shadow-lg dark:hover:shadow-slate-700`}
              onClick={() => setSelectedLocation(location)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold text-center dark:text-white">
                  {location}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold dark:text-white">选择服装/道具/妆容</h2>
      <Tabs defaultValue="clothing" className="w-full">
        <TabsList className="grid w-full grid-cols-3 justify-start overflow-x-auto dark:bg-slate-800">
          <TabsTrigger
            value="clothing"
            className="dark:data-[state=active]:bg-slate-700"
          >
            服装
          </TabsTrigger>
          <TabsTrigger
            value="props"
            className="dark:data-[state=active]:bg-slate-700"
          >
            道具
          </TabsTrigger>
          <TabsTrigger
            value="makeup"
            className="dark:data-[state=active]:bg-slate-700"
          >
            妆容
          </TabsTrigger>
        </TabsList>
        <TabsContent value="clothing" className="space-y-4">
          {/* 服装选项 */}
          <div className="grid grid-cols-2 gap-4 justify-between">
            {costumes[selectedStyle]?.map((costume) => (
              <div key={costume} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedCostumes.includes(costume)}
                  onCheckedChange={() =>
                    setSelectedCostumes((prev) =>
                      prev.includes(costume)
                        ? prev.filter((item) => item !== costume)
                        : [...prev, costume],
                    )
                  }
                />
                <span className="dark:text-slate-200">{costume}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="props" className="space-y-4">
          {/* 道具选项 */}
          <div className="grid grid-cols-2 gap-4 justify-between">
            {props[selectedStyle]?.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedProps.includes(item)}
                  onCheckedChange={() =>
                    setSelectedProps((prev) =>
                      prev.includes(item)
                        ? prev.filter((item) => item !== item)
                        : [...prev, item],
                    )
                  }
                />
                <span className="dark:text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="makeup" className="space-y-4">
          {/* 妆容选项 */}
          <Textarea
            className="mt-2"
            placeholder="Type your message here."
            value={makeup}
            onChange={(e) => setMakeup(e.target.value)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">规划分镜</h3>
      <Button onClick={handleAddShot} className="w-full">
        添加新分镜
      </Button>
      {shots.map((shot, index) => (
        <Card key={index} className="p-4">
          <h4 className="font-medium mb-4">分镜 {index + 1}</h4>
          <div className="space-y-4">
            <div>
              <Label>镜头描述</Label>
              <Textarea
                value={shot.description}
                onChange={(e) =>
                  handleShotChange(index, "description", e.target.value)
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
                  handleShotChange(index, "expression", e.target.value)
                }
                placeholder="描述需要表达的情绪或表情..."
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  const nextStep = (): void => setCurrentStep((prev) => prev + 1);
  const prevStep = (): void => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (): void => {
    console.log("Final plan:");
    // 这里可以添加提交逻辑
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!selectedStyle) {
          toast.error("错误提示", {
            description: "请选择拍摄风格选择",
          });
          return false;
        }
        break;
      case 2:
        if (selectedLocation === null) {
          toast.error("错误提示", {
            description: "请选择拍摄地点",
          });
          return false;
        }
        break;
      case 3:
        if (!selectedCostumes.length) {
          toast.error("错误提示", {
            description: "请选择服装",
          });
          return false;
        }
        if (!selectedProps.length) {
          toast.error("错误提示", {
            description: "请选择道具",
          });
          return false;
        }
        break;
      case 4:
        if (shots.length === 0) {
          toast.error("错误提示", {
            description: "请至少添加一个分镜",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNextStep = (): void => {
    if (validateStep()) {
      nextStep();
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6 dark:bg-slate-900 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* <h1 className="text-3xl font-bold dark:text-white">摄影拍摄策划工具</h1> */}
        <h1 className="text-3xl font-bold dark:text-white"></h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            上一步
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNextStep}
              disabled={currentStep === 4}
              className="ml-auto"
            >
              下一步
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="ml-auto">
              完成策划
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="w-full mb-8">
        <div className="flex gap-2 pb-2 items-center justify-around">
          {Object.entries(StepNames).map(([key, value]) => (
            <Button
              key={key}
              variant={currentStep === parseInt(key) ? "default" : "outline"}
              // onClick={() => handleJumpStep(parseInt(key))}
              className={`dark:bg-slate-800 dark:hover:bg-slate-700 
                ${
                  currentStep === parseInt(key)
                    ? "dark:bg-primary dark:text-primary-foreground"
                    : ""
                }`}
            >
              {value}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {renderCurrentStep()}
    </div>
  );
};

export default PhotoPlanningTool;
