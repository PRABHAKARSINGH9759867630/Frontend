import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Replace Lottie imports with photo URLs
const photoMap = {
  academic: "https://example.com/academic.jpg",
  sports: "https://example.com/sports.jpg",
  infrastructure: "https://example.com/infrastructure.jpg",
  faculty: "https://example.com/faculty.jpg",
  activities: "https://lh3.googleusercontent.com/rd-d/ALs6j_GwOAZi06jZ1P0lVwfSRQcLAzpf2W_ikdv_H6ZeWNe2D1M0ZpKzoeksBEr1joyPDjzeUzXv4GjIey6aGFJPuYJ4BNvGaPeKWTV6DuiLtofuNUX2ViF4WOB1BbFWs5ADuczZ3G4EYxhUF_YbykYH1Ypv8z8Puf73CaJLHC0viW4y8pla3vb9g6FEtfiIDE-1NOkpDdmDDcm5LWh6NOdg1B10z_bXUUWsv6TulLsISMhwJymDBxF2bZ4xkTwxq4A79UGRe2H1-gK1ggQY38josnx9hjx3Vy7XVfvS8XWtlLr_msfA0sNAH-6lbi4M5BuWuerrF2scgm0DDUMFuwg800axvTnwRvxfqW6gLTKhg7eflaJPKmOhkkGFPFEnY41CNT5NeQRWk5ZUpi13oKwbPFmLBpBgTolGjwLh2puY_2Ljye0Kwxi-18v5JfZyabHn5pTZ1bmIMByIeIdzVfpb58fDhDGQzUjPzmY0mtVDl84wkRLdSmDEhocJV38VhuEnHvAQjMcoT5z67cd2VqMB5nhJBf5dDWxW713l8fGaIKzofgpPL-Xn_20wO2XdlpNQ19Rk2xdLx68OZemt0yf-urUjegq-ToO3k-S3USeM92LpYta_FzABQ8p_s6ANBfTU-GAKzmFSEndMNg6TasM0K6KsvbeXDdAlNCr3---uEcOpSr-GgjLDqH4qi9c6oOvkuLrjD0eQTN0hbif5P63dnn-WfcHS5vPv-MNvRvKr60rOtcHdryTwYF0xcpVII6CkzrtM5-vMg3_tR5gLXTuFkYXcdj81wjLqL7Xl60Bh3jvWHxOV2r_J4hS_kA6oOU6Ca8FRsjC1wTbHXvDDPMB_-PHv4bLnHec5Ha_kKcougJtjW6rTCp13HXa4IFNtHORGVh_TTNpp32Hwmz93B7YbUmp3votUsnTdThjQMr5lMnO_BA6QsVL8w2g0JozXuT7b7SePZjGjKvVavRPAeyuPZ7lg5_GmQ6WGDOZ4F_6IOVui5HdeApwnDJlSTqrMbxYiMVnF7RE43xcR0AePjTz1GUpoyhvjowmULgJZJPvCGN0ApsqJV0kN37bDY4HjBR5sPxfca6Ln_m-0Ujzpt-70U7n-ctY7WA4CCncAgrax_u52W1eqSjmaCw=w1920-h917?auditContext=prefetch",
};

export interface Feature {
  id: number;
  icon: "academic" | "sports" | "infrastructure" | "faculty" | "activities";
  title: string;
  description: string;
}

interface KeyFeaturesProps {
  features: Feature[];
}

export function KeyFeatures({ features }: KeyFeaturesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 hover:shadow-xl transition-all duration-300 h-full hover:scale-105 rounded-2xl">
                <div className="w-24 h-24 mx-auto mb-6">
                  <img
                    src={photoMap[feature.icon]}
                    alt={feature.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
