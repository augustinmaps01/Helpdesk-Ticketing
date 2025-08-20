import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { troubleshootingTips } from "@/data/troubleshootingTips";

interface TroubleshootingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TroubleshootingDialog: React.FC<TroubleshootingDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md"
        className="w-[95vw] h-[90vh] max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl overflow-y-auto bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 mx-auto">
        <DialogHeader className="text-center border-b border-border/30">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              <div className="flex items-center justify-center gap-2">
                <Lightbulb className="w-6 h-6 text-amber-600" />
                Quick Troubleshooting Tips
              </div>
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-muted-foreground mt-2">
              Before creating a ticket, try these quick solutions that might resolve your issue.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto max-h-[calc(90vh-180px)] scrollbar-thin scrollbar-thumb-border/20 scrollbar-track-transparent px-2 sm:px-4">
          <motion.div
            className="mt-2 pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
            {troubleshootingTips.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={category.category} className="space-y-2">
                  <div className={`bg-gradient-to-r from-${category.color}-50 to-${category.color}-100 dark:from-${category.color}-900/30 dark:to-${category.color}-800/20 rounded-lg p-3 sm:p-4 border border-${category.color}-200/50 dark:border-${category.color}-800/50`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1.5 sm:p-2 bg-${category.color}-500 rounded-md`}>
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <h4 className={`font-semibold text-sm sm:text-base text-${category.color}-900 dark:text-${category.color}-100`}>
                        {category.category}
                      </h4>
                    </div>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      {category.tips.map((tip, tipIndex) => {
                        const TipIcon = tip.icon;
                        return (
                          <li key={tipIndex} className="flex items-center gap-2 p-2 sm:p-2.5 bg-white/50 dark:bg-gray-800/30 rounded">
                            <TipIcon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-${tip.color}-600 flex-shrink-0`} />
                            <span className={`text-${category.color}-900 dark:text-${category.color}-100 leading-relaxed`}>
                              <strong>{tip.text}</strong> - {tip.description}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg border border-amber-300 dark:border-amber-700">
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm sm:text-base font-medium text-amber-900 dark:text-amber-100">
                  Still experiencing issues?
                </p>
                <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 mt-1">
                  Create a ticket and mention what you tried for faster assistance.
                </p>
              </div>
            </div>
          </div>

          </motion.div>
        </div>
        
        <div className="flex justify-between pt-4 border-t border-border/30 bg-card">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-6 w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TroubleshootingDialog;