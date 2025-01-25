'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import StrategyCanvas from '@components/core/StrategyCanvas';
import FourActions from '@components/core/FourActions';
import SixPaths from '@components/core/SixPaths';
import UtilityMap from '@components/core/UtilityMap';
import PriceCorridor from '@components/core/PriceCorridor';
import Validation from '@components/core/Validation';
import BackupControls from '@components/BackupControls';

export default function Home() {
  return (
    <>
      <BackupControls />
      <Tabs defaultValue="canvas" className="w-full">
        <TabsList>
          <TabsTrigger value="canvas">Strategy Canvas</TabsTrigger>
          <TabsTrigger value="actions">Four Actions</TabsTrigger>
          <TabsTrigger value="paths">Six Paths</TabsTrigger>
          <TabsTrigger value="utility">Utility Map</TabsTrigger>
          <TabsTrigger value="price">Price Corridor</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="canvas">
          <StrategyCanvas />
        </TabsContent>
        <TabsContent value="actions">
          <FourActions />
        </TabsContent>
        <TabsContent value="paths">
          <SixPaths />
        </TabsContent>
        <TabsContent value="utility">
          <UtilityMap />
        </TabsContent>
        <TabsContent value="price">
          <PriceCorridor />
        </TabsContent>
        <TabsContent value="validation">
          <Validation />
        </TabsContent>
      </Tabs>
    </>
  );
}
