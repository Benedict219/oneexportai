import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TradeData {
  top_exporters: Array<{ country: string; value: number }>;
  top_importers: Array<{ country: string; value: number }>;
  yearly_trend: Array<{ year: number; value: number }>;
  total_trade_value: number;
  hs_code: string;
  product_name?: string;
}

interface TradeChartsProps {
  data: TradeData;
}

const TradeCharts: React.FC<TradeChartsProps> = ({ data }) => {
  const formatValue = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  const formatCountryName = (name: string) => {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {formatValue(data.total_trade_value)}
            </div>
            <p className="text-sm text-muted-foreground">Total Trade Value</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">
              {data.top_exporters.length}
            </div>
            <p className="text-sm text-muted-foreground">Active Exporters</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {data.hs_code}
            </div>
            <p className="text-sm text-muted-foreground">HS Code</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="exporters" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exporters">Top Exporters</TabsTrigger>
          <TabsTrigger value="importers">Top Importers</TabsTrigger>
          <TabsTrigger value="trend">Yearly Trend</TabsTrigger>
        </TabsList>

        <TabsContent value="exporters">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Top Exporters by Value</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.top_exporters} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="country" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatCountryName}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={formatValue} />
                  <Tooltip 
                    formatter={(value: number) => [formatValue(value), 'Export Value']}
                    labelClassName="text-foreground"
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="importers">
          <Card>
            <CardHeader>
              <CardTitle className="text-secondary">Top Importers by Value</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.top_importers} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="country" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatCountryName}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={formatValue} />
                  <Tooltip 
                    formatter={(value: number) => [formatValue(value), 'Import Value']}
                    labelClassName="text-foreground"
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--secondary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trend">
          <Card>
            <CardHeader>
              <CardTitle className="text-accent">Export Trend Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.yearly_trend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={formatValue} />
                  <Tooltip 
                    formatter={(value: number) => [formatValue(value), 'Export Value']}
                    labelFormatter={(year: number) => `Year: ${year}`}
                    labelClassName="text-foreground"
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: 'hsl(var(--accent))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradeCharts;