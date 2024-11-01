"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PhotoPlanningTool = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedProps, setSelectedProps] = useState([]);

  const styles = [
    {
      name: "日系清新",
      tags: ["文艺", "小清新", "明亮"],
      image: "/api/placeholder/300/200",
    },
    {
      name: "时尚现代",
      tags: ["潮流", "都市", "高级感"],
      image: "/api/placeholder/300/200",
    },
    {
      name: "暗黑情绪",
      tags: ["氛围感", "低饱和", "戏剧性"],
      image: "/api/placeholder/300/200",
    },
    {
      name: "复古胶片",
      tags: ["怀旧", "胶片感", "复古"],
      image: "/api/placeholder/300/200",
    },
    {
      name: "古风古典",
      tags: ["传统", "汉服", "古韵"],
      image: "/api/placeholder/300/200",
    },
    {
      name: "复古港风",
      tags: ["复古", "胶片感", "氛围感"],
      image: "/api/placeholder/300/200",
    },
    {
      name: "古风古典",
      tags: ["传统", "汉服", "古韵"],
      image: "/api/placeholder/300/200",
    },
    {
      name: "森系电影",
      tags: ["氛围感"],
      image: "/api/placeholder/300/200",
    },
    {
      name: "法式风情",
      tags: ["文艺", "明亮"],
      image: "/api/placeholder/300/200",
    },
    {
      name: "美式复古",
      tags: ["胶片感", "明亮"],
      image: "/api/placeholder/300/200",
    },
  ];

  const allTags = Array.from(new Set(styles.flatMap((style) => style.tags)));

  const locations = {
    日系清新: [
      "公园",
      "咖啡馆",
      "图书馆",
      "花园",
      "书店",
      "小巷",
      "街头便利店",
    ],
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

  const shotExamples = [
    {
      description: "特写镜头",
      angle: "45度仰角",
      action: "微笑回眸",
      emotion: "温暖愉悦",
    },
    {
      description: "全身镜头",
      angle: "正面平视",
      action: "漫步前行",
      emotion: "轻松自然",
    },
  ];

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
        {styles.map((style) => (
          <Card
            key={style.name}
            className={`cursor-pointer transition-all dark:bg-slate-800 dark:border-slate-700
              ${
                selectedStyle === style.name
                  ? "ring-2 ring-primary dark:ring-primary-foreground"
                  : ""
              }
              hover:shadow-lg dark:hover:shadow-slate-700`}
            onClick={() => setSelectedStyle(style.name)}
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
        <TabsList className="w-full justify-start overflow-x-auto dark:bg-slate-800">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 服装选项 */}
          </div>
        </TabsContent>
        <TabsContent value="props" className="space-y-4">
          {/* 道具选项 */}
        </TabsContent>
        <TabsContent value="makeup" className="space-y-4">
          {/* 妆容选项 */}
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold dark:text-white">设计分镜</h2>
      <div className="grid gap-4">
        {shotExamples.map((shot, index) => (
          <Card key={index} className="dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="dark:text-white">
                  <strong className="dark:text-slate-200">镜头描述：</strong>
                  {shot.description}
                </p>
                <p className="dark:text-white">
                  <strong className="dark:text-slate-200">拍摄角度：</strong>
                  {shot.angle}
                </p>
                <p className="dark:text-white">
                  <strong className="dark:text-slate-200">动作：</strong>
                  {shot.action}
                </p>
                <p className="dark:text-white">
                  <strong className="dark:text-slate-200">情绪表达：</strong>
                  {shot.emotion}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
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

  return (
    <div className="container mx-auto p-4 space-y-6 dark:bg-slate-900 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* <h1 className="text-3xl font-bold dark:text-white">摄影拍摄策划工具</h1> */}
        <h1 className="text-3xl font-bold dark:text-white"></h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="flex-1 sm:flex-none dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            上一步
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
            disabled={currentStep === 4}
            className="flex-1 sm:flex-none"
          >
            下一步
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full mb-8">
        <div className="flex gap-2 pb-2">
          {[1, 2, 3, 4].map((step) => (
            <Button
              key={step}
              variant={currentStep === step ? "default" : "outline"}
              onClick={() => setCurrentStep(step)}
              className={`dark:bg-slate-800 dark:hover:bg-slate-700 
                ${
                  currentStep === step
                    ? "dark:bg-primary dark:text-primary-foreground"
                    : ""
                }`}
            >
              步骤 {step}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {renderCurrentStep()}
    </div>
  );
};

export default PhotoPlanningTool;
