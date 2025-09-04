import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TradeTableProps {
  data: Array<{ country: string; value: number }>;
  title: string;
  type: 'exporters' | 'importers';
}

const TradeTable: React.FC<TradeTableProps> = ({ data, title, type }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const formatValue = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
    return `$${value.toLocaleString()}`;
  };

  const sortedData = [...data].sort((a, b) => {
    return sortOrder === 'desc' ? b.value - a.value : a.value - b.value;
  });

  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const getRankBadgeColor = (index: number) => {
    if (index === 0) return 'bg-yellow-500 text-yellow-50';
    if (index === 1) return 'bg-gray-400 text-gray-50';
    if (index === 2) return 'bg-amber-600 text-amber-50';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`text-${type === 'exporters' ? 'primary' : 'secondary'}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm font-medium text-muted-foreground">
                  Rank
                </th>
                <th className="text-left py-2 text-sm font-medium text-muted-foreground">
                  Country
                </th>
                <th className="text-right py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSort}
                    className="h-auto p-0 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Trade Value
                    {sortOrder === 'desc' ? (
                      <ArrowDown className="ml-1 h-3 w-3" />
                    ) : (
                      <ArrowUp className="ml-1 h-3 w-3" />
                    )}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr
                  key={item.country}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getRankBadgeColor(index)}`}
                    >
                      #{index + 1}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="font-medium text-sm">{item.country}</div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="font-mono text-sm font-medium">
                      {formatValue(item.value)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No trade data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradeTable;