import React from 'react';
import atulGoel from "@/assets/LeadershipSlider/Atul_Goel.jpg";
import rupaliPuri from "@/assets/LeadershipSlider/Rupali_Puri.jpg";
import mukunjGoel from "@/assets/LeadershipSlider/Mukunj_Goel.jpg";
import rohitGoel from "@/assets/LeadershipSlider/Rohit_Goel.jpg";
import ruchiGoel from "@/assets/LeadershipSlider/Ruchi_Goel.jpg";

// --- Sub-component for a single profile card ---
// Yah component ek profile card dikhata hai. Ise hum dobara istemal kar sakte hain.
type ProfileCardProps = {
  imageUrl: string;
  name: string;
  title: string;
  message: string;
  imageAlt: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ imageUrl, name, title, message, imageAlt }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out p-4 md:p-6 lg:p-6 transform hover:-translate-y-1">
      <div className="flex flex-col md:flex-row items-center text-center md:text-left">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-gray-200 shadow-md mb-4 md:mb-0 md:mr-6 flex-shrink-0"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const img = e.currentTarget;
            img.onerror = null;
            img.src = 'https://placehold.co/160x160/E0E0E0/4A4A4A?text=Photo';
          }}
        />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h2>
          <p className="text-md md:text-lg font-semibold text-indigo-600 mt-1">{title}</p>
        </div>
      </div>
      <div className="mt-3 border-t border-gray-200 pt-3">
        <p className="text-gray-600 leading-relaxed text-base">
          {message}
        </p>
      </div>
    </div>
  );
};


// --- Main App Component ---
export default function App() {
  // 5 logon ke liye data
  const teamData = [
    {
      name: "Mr. Atul Goel",
      title: "Chairman’s Message",
      imageUrl: "https://lh3https://lh3.googleusercontent.com/rd-d/ALs6j_EOPY6e_vispPkYfokQ5LA6apNuTfOLA-ALZVVHNti3q7uk1MPzFTHeltDCwP8xEjCbN9Q3Vk0Md440rNt1b1zq3oCqOwNh8K9FLDl1lrUB8jZj4b7uFwnHTnddV1_OKa8RzXYFJPTvVRCnl9pvTGHEI3dSpcgrGIYIdSnpBchgRZYRWvX9jcejoerFUX12C4o-vBzzFb7UdK5BtJRZb7nUtaXD7uvr4Za06FaeHwtS56ccS-3dG3yY-QQMCQt-NBuksoeUM9YDDEENELd3CfyHFzkX1OM65bbocc99gBNk-FCfNggfaoXnvrufT_QyBhXJTWPOnMAWZCwKe-_J8xAxsl-SF3qObc_4I8DrVOzsboNDuUeKS6lT2WUOv6OUHmppSUE_ZBrbq1sR23PlDuJSlu6JNJQf9h1TvRk-XaCK5joiOCZX_Dm9vtKMEY5TDfOAORGRo-UYHceQm-1UJeDdNUz8q9MHFQWONFK09isAnQiQ77hDCo8ZW9Pfwxpn71LEnHBK1aQeTfRJ76UNA1RpanMy_dXxU1hgEbslTc0T6NaowhTsS3ZOj9rc8-qxZrRCV42PU_hGycgOyRk-bY0JjsR14n0DF5au5vJBjK7ONNB6avWQBT-gkmrsVmeRkF19YbMFJk0JfXAQ8yCLaidgzD0_67m4v-CiNEkv-dmM2PSy7EmqdL-WMBcT38Za7899oO74e7ec09T2hwFhrJJuMWlItxBs2oka35LGj0DiyjqZ1afMYkHOW5BsrKZVI9vZqwQ6bS_LKB1Kzl4KTWtRQm2OnwoCEM5D10-wVLR-b3mcxtbzZnsXp5aaIjRp_tCLDC1QpRbIbJyHDZ0_2FROWQXShPvVZbzGe6Cno72sexAwmLcAUp_T9xDuRAjb-xQGJ7v5XYEnlL2bhkxrGHYQ_zknrA08sQUTT7KIyROfdzawyMgP27d0KVzX491E9PMLnANd5jRVUg9cxThG1r1hNSZDfAWWdjC1HVo1QjTqJAJm10xpYV5Z2__07dtdXRY8fmNhLieB38idNryrqz7tpt7vfaIxOGKB5uSg81ZElxqk12lf6_13DgNj7CsZMcCKxuZ4foOF08K34MhAv7cPJodCGDzQxqN69K6VW_c7CtL56JVtUvM=w1920-h917?auditContext=prefetch.googleusercontent.com/rd-d/ALs6j_FOfbFLWd9jMVcBsBQB0Eoe4Ci8Bbc6l2s_RlE0Z64ucu06YN0N18TXyszlur0hjUkehkDIeAIajmXHnxvQzrweRdbMHOpzjoKYNIkFc9L1Y26P31ZnmKS30LDyb9_tSlvev3XGrjd7nW3MBhMmcri8_ezS0ZsLJKx67NMbRKXHgxwKCn2G33pTkkeic0Pi8WLijhVuML6ZBdL7ZHcKiVRU-znUeGWl0qcZIQZyw27QdzkjZiqDl2Wg0ceIzScnuh_dR_SLpDqOBPsSkjPIGKVrpi1NHFpiYXDNveUiu-CKXNWHh_oPv-Dy6Lt_MPC2wzmPeR3O6zW9Fswz5ZPRFZ6kuFrXWd6QNhuv26GNP-CS4UNTJB-iBYwxJVMTomvWkoVtRLnzx4zOqIJgHXcD_gdLdMxXCnV0DrSWQ7v1Lsm_cFEZr-jp2amHHVNkuXzpkeQQ7ZGYuntIcIHSBEUcWd0PQdlsDaAL1Djp1b0jlj7UHt2omWw5pE85p1wxAzR5l_JbXSLWPkJpjapgx4bZrTFmEHV38jpJZrpmdGVMGEzw4bl3uL1n2CEkUM5vzNRtPjrkuuXCi4ox7Pu9k3Az2F96TlyrxrLKTjhdhIfrkfGcvLrFnG5RWY9zoIhd-qgSnx4fTrM-YRLouy1crosk4uBnhM_9VFIH-tIogo1_2rrmM9KfcJ4l3l5aXhu4N5wqJSvWAHUY89qGZPDCRwSeOK3xM2yy1K9O6xy2IVrxtU0EMUrOz2SuiLT3n_LIxc9VU2tdAVY_FKHokcWn5FiX1eXbuT5BOK1Yf_jfi0-RWs4ojHEJCy2-hSKBwv7LhZxvveqKVpEMRPl82RITwBE9QSoR7RqCFvFE_FlkULq15rawaZB_IQ0_SA19UJqWaTqjQWBjtTnZ78iLhzBMeNH3lP2GiKGiWkWWJjooUgN_6vcr4ajeVEnv5UXFT4z3iGpNOoVIRuGRx-vTPVkKyboaCrY3BYerVbg86AJsV1cBSNanFZ1SicTp7t8Ienv6G4rU4aFI4bo1jOxT-s2OxUGJswmhK_GTuqZhdkQaui70Cu8UGvIiE3B1SSi125tAkD6Ck-FMLXEyLMn9Murb54zA_tGp5CaK29_bZwQg3p0VQHk0qiHOm0fIFAs=w1920-h917?auditContext=prefetch",
      message: "Every Goenkan is an achiever in their own right. At G.D. Goenka Public School, Rudrapur, we strive to nurture aware, confident, and assertive individuals. The education we provide fosters a positive outlook and enables our young nation-builders to believe in themselves. Education broadens our horizons and cultivates tolerance for diverse perspectives. An educated mind can understand and respect viewpoints different from one’s own. True education enlightens, empowers, and prepares individuals to face life with wisdom and integrity.",
      imageAlt: "Mr. Atul Goel's Photo"
    },
    {
      name: "Mrs. Rupali Puri",
      title: "Principal",
      imageUrl: "http://localhohttps://lh3.googleusercontent.com/rd-d/ALs6j_HPeaOhwV55DXvTdo2-OV9K-cI4gejhvhm_6qRskK7zBRNh7YCtPX82CG_hW0qx_IFqIrhPswPfmRBzKzQuSzHiRgp628vqLEEaN_0FHXSyPKB9OflVZmfub1qLsq2DEXzQS4KgtYguJol_1tYc2dIi87RWI7ruEddipSbO4iw8gp4kr24cHaXYe2d701A876o5Xsi2YjyKRD4qPFE4uR_BqYjm3xMJbx4wiJarAoLIPfG9npzbyCJNIkHGzJdqAmT3LqKWRJyrcNWLp6IxHVyr8cXxa8PHy5hqW-69YVhXPwkhExnG8qXpACPmIuHZUN04g5bejxdZg44LXHIHfDwSPalqOwi1Ba8KU5SI_fdasQrBEhNqXrijPbGA1YLh-HDrIoDHtNu3ZQcc9LY6niUmdvHXjHsNqQR5CbC6yE2_8qVo35XSMFoeILfn8IT0tyRcN2KJzl7oMb7rsOe09wxj78tcwDFsdzOYfwTibPuBY4RtT37XL1h_7Z5IXa5ytxpkcEvZ3cgCzxXg3_roLhV2Tdskk9Ski6RBpv9Dj6r_V6eF64YXS6AgIwltvOw6p6nsmhqWpw0RlnxhAAGbLJ21ynEalw_2DlVFMukxQiuH4-w-Ap_CBe3lr2viPupPjJdKQiQZOnyRylvVivuWxgYKVogFIG5gqdF61FjMDq3LK1CFYsELcMUhknhT5ecVWoPcLRINABe2k0EbTn80Exp6LbgiU35sk4HfEJQo4q4OkTFXo8CX0lI80zSugH1Y5Hwa0gZoaSTYJyhbYzgK2liTSUWb9bklNB9_tbvTWwG76ZrzZkUfQgUfaPiH2OgYZV3zKRGA2nxmTxM7nZ5WiUaT-prGPZ8HG9pIA_lc-YFdrDwcIUJu3RsjZuuTHWza8M-9hIY6GBl7X24ou0M8iZjRBqXN3AUL8BXymxsD28ZJxjFydmNzydOfCNatQW7TShDAkCzmd59Zn-WfN7B0cjZg45LcmStStsJwVpBPW-LnhvjX6oUPFTBeQUmQiAjqCMm5J9K9229ULkTyeoRBfZaBMd9F-_bp1jQv0yQYdGsGHzZoeVYgD1peLngYooLJ9VcIEW82DQs6Dv9TVxJrKewLZeEJgWXVbja-4gQG5RqZucsiAkLt96o=w1920-h917?auditContext=prefetchst:1337/uploads/Rupali_Maam_dc82cef80f.jpg",
      message: '"The function of education is to teach one to think intensively and critically. Intelligence plus character – that is the goal of true education." Education is a shared commitment among dedicated teachers, motivated students, and supportive parents. It is not merely a process of imparting knowledge for a future career, but a lifelong journey that instills moral and ethical values, preparing students to become the hope and strength of our nation.',
      imageAlt: "Rupali Puri's Photo"
    },
    {
      name: "Mr. Mukunj Goel",
      title: "Director",
      imageUrl: "http:https://lh3.googleusercontent.com/rd-d/ALs6j_GHzRhbnkQK-MyXfIFHU_b8t9aJs2LaMtSbRvR1p1cKCNCJyDjnuZjHR6wIP3oGe4wa08JAD5IM5TFWBlB9j_we93tx5Rcu5Z6xny0f-e6VlSkkuDtAr5RxLZg5_SlyM2XMMLQqKWmRAPNjM6OFsfjMsk2wubh3GEARHL0DrreWf8nFXWZOYPlsRSbx83lOtURvtdm9uznVVpX5HlZ_uF4v_4n7veWglocnjglGIWKx__KwsNdEuqC357Ap39qYkUu4AEnG7FuUd9wbdPdyzULkbtM_GVmRM5Z_c7DMdcSQ_24gfvtY1HWq13nkqbprjXYc3iftAhr7puYkECIjYN9HR5_ueWMtFQ_12GldMgOz8745ZnBXrqFU1Z1GgvTIv28tHUOa1ZHBZI9Gb1IJuOEg_Lhq9Xwwjy0Rg_9NtTCmQJrhjLx3PzHMQ32oLVVVwXUajBPChkPjvyCw1vv2PmmpDQpz6JTx7jH3aAmuyR4IIx4fUc1pz7cu0XPZNdz10T8XT1XYcxVjLaKZkjfUQ9Z_syf5cwTcXqpqrYsMPLnNawRFpeO2QKP0sQn5wnuAxdAVySTVZd5ZoC5AIqpzyeSmjRBA3-skj7CVp8uyBk49cctyxuYEng8kvQYbfDRBDeeM37txs5HKnvvTvHyjiA_N_yJVFeycNmL1kyFvVY8U_a_pRH__Fh0buQcLt2JuLvhLm-7yxLhPyYMW-u7WaTobYQsgYoeCsahR_KGptpIFHU5zg-DbGisd5w0B9d3bMZulLx-3nm-fZevRKlx3SIAdve4PfTDVxDvWZ4SQxqDXjO2rcdFUSMVHqnxYVsdAi98XzSZ6Oq5wwTcbUYzWc5mcs9vYicJNHnQTl1javEURxgrYH74X7E9CFgJts9McbpK-AAJlZ1-wYiPWzMNYuExUEski0FTW_q7MkD1tkSeogZD1Vqp4njVEWMJODzCt6eMogS3oFDSoz91LiSs1qWAxaHVwaea0j1-SC8z0Cr4RfWHLUSJ3xdaOKxtj3OxgMSNh4sB8XhbDV0AJSFSy51v-wKwk0C66zlyNOnGoQOGj8ZYLR2LyhNYUVe1DEoMzPWEIWmfYofYJOfG07b3_D9CRhc4VCj6FKqLejU6Rjjmadd0DF-Sn500=w1920-h917?auditContext=forDisplay//localhost:1337/uploads/Mukunj_Goel_86d765faac.jpg",
      message: "At GD Goenka Public School, Rudrapur, we aim to build an environment where students are encouraged to explore, innovate, and achieve excellence. Our focus is on nurturing strong values along with scholastic and co-scholastic growth, preparing every child for future challenges.",
      imageAlt: "Mr. Mukunj Goel's Photo"
    },
    {
      name: "Mr. Rohit Goel",
      title: "Director",
      imageUrl: "htthttps://lh3.googleusercontent.com/rd-d/ALs6j_Gi5f6Df-CQN-iQ8M_4dajhFBwaFPKvk8PqRICJQxdYzSmRRlepT17x49u5gx7AR9DKphHz3mxA428Qv8NdWuGS1fuic78DanWY7agtXHTNAspEijz2_cOTIpDXYkFc7TXGcN6Lo_MNwQpK_pzr8D1TFvnPJ_IhlfzsHgJre-sXK16omguZX1zkrgWIMsjYfNJFOGQzERI5jzTtnMJ18Mbhs3aOBMdARLSABHjaKnmxpjGYOxJL4mZd27qA28fyh9RmmLckFW3Q3JnK1AYHsPTElPWxcVz43hvz2T4Bx_O3mWDJZBmvQurvi6x2bsqFL3A7dOnxQX_zSWHCc4DwbiQ7o14NvdrfMooYMlsPQJVfO_u8YYULsoFfNby0vD-2ZAd-6UDi01DCAufN-qOwsE8XpjdM8MwyaeoZPcWTiShbysWud5wTLw1cC5qq1iOy79P4Cd-6nE8u5kfihBWp8fYiCgX30wfaBNL_e0YnKEhqFTZYrLRsKlbOKq22BwWl3sGQ9pN3kqajosSEoWrwsgHg6EYGh1hI1v0q-CJr8CC4SOO6cWWFV-zvjzcAlm_s0_kJrvwdNj9Z3EbbaVJsSVkQ6ceQwWOXws51lQ0S2TjUyKa1FSRQqanHfw-Y1roNp-Pcsu5oxG4jhJkILcAsYBX8tJJ_kEC2JdzmuJGQDJQaOOIq-QKgglrud4Aoo751k2AM2pMJAGLTYxzhuPDG8lJFEZ978CvbpitqMIswcpQMSCvA6CxS59e-7D7dC9KkJR7zz0g8IdrmXmzZgPeZCxYsMv9a9CsMmoMA1k_6LOwZ95QqQn0En2BZmUfJLOQgKPyhq-1tid3uBlpyHIztG_MBMc17ycPY960fyLtwBV0jaVYo-67sK-YwY67z3h5moK8ypSRhmJGIe5eN6D81aQkbS2BbVB4KRsnEttySUf_Cc458IQBA8GIJd-jjZ9jyEz4p4ZukZQqfabiA6_xH4N4FAnjAnfQPC3Jvb0HMZRrYZD64HSOOpFndlr6DyveJ5NvtWAtc7G7AiAcZfE1-fWjdsnMYXkImU34fKKz6mQTU2SITzNs_opcZWzY0ahCt2b2-QgI6a4yAubcQ-Nw5AT_bcbQtFvl3HM_GUW2K6iPGeX9G5WQCV2I=w1920-h917?auditContext=prefetchp://localhost:1337/uploads/Rohit_Goel_734fec01f3.jpeg",
      message: "Our academic philosophy emphasizes not only knowledge acquisition but also critical thinking, creativity, and moral development. We ensure that students are empowered to become independent, self-reliant, and socially responsible citizens.",
      imageAlt: "Mr. Rohit Goel's Photo"
    },
    {
      name: "Mrs. Ruchi Goel",
      title: " Director",
      imageUrl: "http://https://lh3.googleusercontent.com/rd-d/ALs6j_EzUhQ0hyqzSYxnR06ue_N-Iza1eOAImcvETf1jyXr_lWZpyRbmXxRVHInn6mG49Ghfz4ex76hDi5H9b5VWE9qVGc9GKcqwFul-5uU7QGZiKuupmeOhIUZ671RIEFtnaagPjG7zt0uIF7udIxRPG4Ik_8RZjYq7OZBlEBpugPGA_jbggD5GOqeB_cpJF4Bq9KrPV-lNE08Gm-aXkAT3k4qbbleczOoBUm2xzNfXPtwgYGR0RajGveEZSbIV-DueJo65phSLRT3sv9j8yRxix-R9Ff5xNJ40WQvkalI5s4LnfUIL74h8cAn5eoWIVCKcjJhRbIMtIHXS5epdckvurZ-ApTnVKAN1ODTTqqSEtknLfeB-y7S-K_NbP9JQCOIc14kTqgXq7hUBv_OBcN0uJ-y02sWSwDwO2WYu50sQEoA7DK7JlZtvi6-bdF8PZOGnRvnB1OQ7rXQxpEohxyzVqI93QaCD2VlPHoCk7mfMchaXlYpvZDXe2iIsHdPXDbEmCLayoWGNTVwjfvSoONp4hfewAOUGWtFO-SnjCwY-U-wHgK2jINeNyvVCi8m4skCSwLGZRisN7F2PrXYbXtRYdKuouQF_ys6mE7d8Dh5fnyQ5oaU21-9v522UgBus-ohoecKw3vhecnC5rbCNRTmcAjav9KIrEUKioMOu1XDJfJkmbJ34KgmRicHl9BVv1eYUUFndTw5EJquT2FlWskhXxFCTWGu_qR-I7r34zK-w1VLE4rIqhxmK3euAX3_syLQNUwovV-QElE348ZvdXVvvl-YhAbSYfMSofrXWcCch1GX3mxDWNLCHraoHnknb7hRoMcAtEXKVhZyBpmXrwef-5QBGjO5nvoJMmlhBTwuTUZGSVJY_PDtvRZErBJsouB8WIlOv93Mpe4IKwxZV4Q32EVwB66giAopO6IeR_71PDvAWrZH9GvF-EkEXeW8m1mIbScbA5zrsNNVTgZ6TSIpfjqlM_LgEaMymn5_v199iRqHKI-eqPL4gszgDfnRYMouUDTwrD5-xc6BfJyR2psLFvcdvSGzXiVUXkkXPrUH6hM7MAj9zl2jLVCeptmQ1gdxilPWx-nLmB_Qw7w-RsFxcH2l0EUXDZ1LEeUY2X4o-YqVmWTE45YpP-O4=w1920-h917?auditContext=prefetchlocalhost:1337/uploads/Ruchi_Ma_am_a82cec15a6.jpg",
      message: "We believe that every student is unique and has immense potential. At GD Goenka Public School, Rudrapur, we are committed to providing guidance, support, and opportunities that allow each child to realize their fullest potential, academically, socially, and emotionally.",
      imageAlt: "Ruchi Goel's Photo"
    }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const timeoutRef = React.useRef<number | null>(null);

  // Automatic sliding ke liye effect
  React.useEffect(() => {
    const resetTimeout = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    }
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === teamData.length - 1 ? 0 : prevIndex + 1
        ),
      4000 // Har 4 second mein slide badlegi
    );
    return () => {
      resetTimeout();
    };
  }, [currentIndex, teamData.length]);


  return (
    <div className="font-sans antialiased">
      <main className="container mx-auto px-4 py-1 md:py-3">
        <div className="text-center mb-3 md:mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Insights from Our Chairman, Principal, and Directors
          </h1>
         
        </div>

        {/* --- Carousel Section --- */}
        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform ease-in-out duration-400"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {teamData.map((person, index) => (
                <div className="w-full flex-shrink-0" key={index}>
                  <div className="p-1">
                    <ProfileCard {...person} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider ke neeche dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {teamData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'w-6 bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}