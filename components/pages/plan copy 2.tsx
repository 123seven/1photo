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
  ];

  // 获取所有唯一的标签
  const allTags = Array.from(new Set(styles.flatMap((style) => style.tags)));

  // 根据风格匹配的场景
  const locations = {
    日系清新: ["公园", "咖啡馆", "图书馆", "花园"],
    时尚现代: ["商业街", "艺术馆", "时尚工作室", "都市街头"],
    暗黑情绪: ["废弃工厂", "黑暗角落", "地下停车场", "老旧建筑"],
    复古胶片: ["老街", "复古小店", "火车站", "老式公寓"],
    古风古典: ["古建筑", "园林", "茶室", "戏楼"],
  };

  // 拍摄分镜示例
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
      <h2 className="text-2xl font-bold">选择拍摄风格</h2>
      <ScrollArea className="h-12 w-full whitespace-nowrap">
        <div className="flex gap-2 p-2">
          {allTags.map((tag) => (
            <Badge key={tag} variant="outline" className="cursor-pointer">
              {tag}
            </Badge>
          ))}
        </div>
      </ScrollArea>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {styles.map((style) => (
          <Card
            key={style.name}
            className={`cursor-pointer ${
              selectedStyle === style.name ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedStyle(style.name)}
          >
            <CardContent className="p-0">
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-48 object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 p-4">
              <h3 className="font-semibold">{style.name}</h3>
              <div className="flex gap-2 flex-wrap">
                {style.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
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
      <h2 className="text-2xl font-bold">选择拍摄场景</h2>
      {selectedStyle && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {locations[selectedStyle].map((location) => (
            <Card
              key={location}
              className={`cursor-pointer ${
                selectedLocation === location ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold text-center">{location}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">选择服装/道具/妆容</h2>
      <Tabs defaultValue="clothing">
        <TabsList>
          <TabsTrigger value="clothing">服装</TabsTrigger>
          <TabsTrigger value="props">道具</TabsTrigger>
          <TabsTrigger value="makeup">妆容</TabsTrigger>
        </TabsList>
        <TabsContent value="clothing" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* 这里可以根据选择的风格显示对应的服装选项 */}
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
      <h2 className="text-2xl font-bold">设计分镜</h2>
      <div className="grid gap-4">
        {shotExamples.map((shot, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p>
                  <strong>镜头描述：</strong>
                  {shot.description}
                </p>
                <p>
                  <strong>拍摄角度：</strong>
                  {shot.angle}
                </p>
                <p>
                  <strong>动作：</strong>
                  {shot.action}
                </p>
                <p>
                  <strong>情绪表达：</strong>
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
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">摄影拍摄策划工具</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            上一步
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
            disabled={currentStep === 4}
          >
            下一步
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        {[1, 2, 3, 4].map((step) => (
          <Button
            key={step}
            variant={currentStep === step ? "default" : "outline"}
            onClick={() => setCurrentStep(step)}
          >
            步骤 {step}
          </Button>
        ))}
      </div>

      {renderCurrentStep()}
    </div>
  );
};

export default PhotoPlanningTool;
