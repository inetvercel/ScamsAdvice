export interface Post {
  slug: string
  title: string
  date: string
  dateISO: string
  excerpt: string
  content: string
  featuredImage?: { src: string; alt: string; width: number; height: number }
  tags?: string[]
  metaDescription: string
  type: 'post' | 'page'
}

export const posts: Post[] = [
  {
    slug: 'google-ads-dont-become-a-victim-of-fraud',
    title: "Google Ads: Don't become a Victim of Fraud",
    date: 'June 14, 2019',
    dateISO: '2019-06-14',
    excerpt:
      'Google Ads has a serious security flaw that scammers exploit. If you assign an admin to your account, they can delete you, spend your money, and Google will side with them. Learn how to protect yourself.',
    metaDescription:
      "Google Ads has a critical flaw: a hired admin can delete you from your own account and spend your money. Learn how this Google Ads fraud scam works and how to protect yourself as a small business owner.",
    featuredImage: {
      src: '/images/google-ads-freelancer-1.png',
      alt: 'Google Ads fraud scam evidence on Freelancer.com',
      width: 941,
      height: 250,
    },
    tags: ['google ads', 'google adwords', 'freelancer.com', 'seosea01'],
    type: 'post',
    content: `
<p>If you are a small business owner, then you might have considered using Google Ads. However, Google Ads has an area of opportunity for scammers due to a system flaw and scammers are taking full advantage. Continue reading.</p>

<h2>What is Google Ads?</h2>
<p>AdWords, recently re-branded as Google Ads, is an advertising service delivered by Google for businesses wishing to display ads on the Google search engine and its ad network. The program allows a business to set a budget for advertising which is charged per-click. The ad service is largely focused on keywords via bidding.</p>

<h2>What's the Scam?</h2>
<p>Due to the general complexity involved with Google Ads, many business owners create an account and then consider hiring an <em>admin</em>. The admin is generally tasked with creating a campaign, creating bidding strategies and similar. However, this is where things can get ugly.</p>

<h3>The Scenario</h3>
<p><strong>You</strong> Created the Account, it's <strong>your</strong> payment method attached to the account, but Google allow an Admin to pilot the account ignoring the card owner and <strong>original account creator</strong>. In other words, if this admin suddenly decides to do something untoward (fraud), then there is little you can do (Google Ads protects the person committing fraud).</p>

<p>It's your account, since you created it, you attached your own payment method, however, the admin can simply delete you, spend at full wish (on their own ads) and Google will only listen to the admin of which deleted you (with your payment method attached).</p>

<p>Of course, this is a hijack and once you have zero control of your card (when you cannot access the account due to the scammer deleting you) it becomes fraud. To be clear, the definition of fraud is: <strong>wrongful or criminal deception intended to result in financial or personal gain.</strong></p>

<h2>Where Might You Find This Type of Scammer?</h2>
<p>You are likely to come across this type of scam on a Freelancing website. Tech savvy scammers can take full advantage of this loophole and they prey on newcomers of whom are seeking help but have little to no experience with Google Ads. They'll likely convince you to make them an admin <em>(no warning provided about the dangers you can encounter from Google),</em> and they'll begin as you'd expect, creating your campaign and winning your trust. You'll be tempted to deliver great feedback as they possibly generate positive results, however, that's how they can build a good feedback profile <em>(month one, good feedback, month two scam happens).</em></p>

<p>As can be seen below, the scammer is generating negative feedback due to their actions, username: <strong>seosea01</strong>. Freelancer.com</p>

<figure>
  <img src="/images/google-ads-freelancer-1.png" alt="Freelancer.com reviews showing negative feedback for scammer seosea01" width="941" height="250" loading="lazy" />
</figure>
<figure>
  <img src="/images/google-ads-freelancer-2.png" alt="Freelancer.com profile of scammer seosea01 showing fraud evidence" width="1076" height="217" loading="lazy" />
</figure>
<figure>
  <img src="/images/google-ads-freelancer-3.png" alt="Additional evidence of Google Ads account fraud by seosea01" width="954" height="254" loading="lazy" />
</figure>

<h2>What Does the Scammer Gain?</h2>
<p>As mentioned before, most people involved with Google Ads are tech savvy, and it takes such an individual to conduct the scam. For example, they may have their own websites in place or other clients from where they can use your card to generate leads for themselves.</p>

<h2>What Can You Do If You Fall Victim?</h2>
<p><strong>Call Google (if you can):</strong> Such a scammer will likely select Saturday or Sunday as the opportunity to do something untoward. Why? Google Ads isn't available on the telephone at weekends – clearly a good time for such a scam to happen from a scammers point of view. It leaves you unable to talk with the Google Ads team.</p>

<p>Based on experience, Google will take you on a trail and actually communicate with the scammer (admin) opposed to you as the account creator, of course, the admin (scammer) replies with something such as: "we don't wish for the user to be involved with the account". Thus, your account, <strong>from which you created</strong> along with <strong>your payment details</strong>, is no longer in your control (fraud).</p>

<p>It is important to contact your bank since fraud has happened.</p>

<p><strong>Advice:</strong> Be wary about assigning an admin to a Google Ads account. Avoid people who demand admin access. Use a trusted company to run the ads for you.</p>

<h2>How Can We Stop This Scam From Happening?</h2>
<p>Google has the ability to change this, however Google appear totally unwilling to acknowledge this (support team) and thus, it might take government intervention.</p>

<p>Google should consider the creator of a Google Ads account as the overall authority. Admins shouldn't be able to simply delete the account creator from where there is no comeback, especially when the account creator's payment details remain live. Google should work closely with the account creator and treat other invited users lower down within the account hierarchy. A common-sense approach should be applied. Without this, tech savvy scammers will abuse the Google Ads system.</p>
`,
  },
  {
    slug: 'usernames-and-emails-relating-to-scams',
    title:
      "The 'middle man' marketing scam that catches out website owners and blog / website publishers",
    date: 'March 13, 2020',
    dateISO: '2020-03-13',
    excerpt:
      "A scammer posing as a legitimate marketing middleman secures advertising deals, collects payment from website owners, and never pays the publishers. Here's how this LinkedIn-based fraud works.",
    metaDescription:
      "Warning: A scammer using email mail.grunbaum@gmail.com is operating a 'middle man' marketing fraud on LinkedIn and email, billing website owners while never paying publishers. Learn how to protect yourself.",
    featuredImage: {
      src: '/images/middleman-scam.png',
      alt: 'Middle man marketing scam evidence',
      width: 1022,
      height: 1025,
    },
    type: 'post',
    content: `
<p><em>Added: 13/03/2020</em></p>

<p>Email: <a href="mailto:mail.grunbaum@gmail.com">mail.grunbaum@gmail.com</a><br />
Using another person's real LinkedIn profile (they are posing as a real person who works in ads) and linking to it within their email.</p>

<h2>The Scam</h2>
<p>Acting as a third party within marketing, operating on email and LinkedIn. Gains trust from a website owner, becomes the 'middle-man' between that owner and websites. After securing marketing deals with website owners, he bills the owner and never pays the website from where he secured the marketing.</p>

<figure>
  <img src="/images/middleman-scam.png" alt="LinkedIn profile used by middleman scammer to pose as a legitimate marketer" width="1022" height="1025" loading="lazy" />
</figure>

<h2>Outcome</h2>
<p>Owner loses his marketing after it is taken down, possibly loses funds too if unable to claim back. The marketing website delivers what is <em>free</em> advertising <em>temporarily</em>, but this is later taken offline once the website owner realizes a scam is happening.</p>

<h2>Where Does the Fault Lie?</h2>
<p>When conducting a digital marketing campaign, it's your duty to hire those who aren't scammers. Thus, you are ultimately responsible for any payments in regards to compensation to the website owners of whom also became a victim.</p>

<h2>What Can You Do?</h2>
<p>Learn your lesson. Don't hire the wrong people to pilot your campaigns. Next, claim your money back immediately from the scammer – begin a PayPal dispute. Thirdly, ensure the website from where you received free marketing (briefly) understands the situation and offer to work with them directly – after all, it isn't their fault that you hired a scammer.</p>
`,
  },
  {
    slug: 'react-org-the-ugly-side',
    title: 'React.org – the ugly side',
    date: 'January 29, 2021',
    dateISO: '2021-01-29',
    excerpt:
      "Certain members from React.org are attempting to take down legitimate websites using lies and threatening behaviour. We document the evidence and call for an investigation into member Ivona Antic.",
    metaDescription:
      "A React.org member named Ivona Antic is using threatening behaviour to attempt to take down legitimate websites. We document the evidence and request an investigation into React.org's vetting process.",
    type: 'post',
    content: `
<p>It appears certain members from React.org are attempting to take down legitimate websites. Of course, this seriously lowers the authority of React.org and their ambitions moving forwards.</p>

<p>Lies and threatening behavior have been witnessed from a certain member, which certainly can result in true legal actions.</p>

<h2>Details</h2>
<ul>
  <li><strong>Member Name:</strong> Ivona Antic</li>
  <li><strong>LinkedIn:</strong> <a href="https://mk.linkedin.com/in/ivona-antic-0bb58923" rel="nofollow noopener" target="_blank">https://mk.linkedin.com/in/ivona-antic-0bb58923</a></li>
  <li><strong>Website:</strong> <a href="https://www.react.org/" rel="nofollow noopener" target="_blank">React.org</a></li>
</ul>

<h2>Outcome</h2>
<p><strong>Outcome:</strong> Vetting of the members, ensuring members don't use the website as a threatening delivery to legal ventures. Due to this, we request the possible suspension of react.org website visibility in Britain – at a request, the member and website will be investigated.</p>

<p>We'll continue to update this article with our on-going investigation.</p>
`,
  },
  {
    slug: 'list-of-different-seo-scammers-email',
    title: 'List of Different SEO Scammers Email',
    date: 'July 29, 2023',
    dateISO: '2023-07-29',
    excerpt:
      "Has your website been contacted for publication with a monetary reward? This is a comprehensive list of 147+ known SEO scammer email addresses that don't pay website owners after securing links.",
    metaDescription:
      "A comprehensive list of 147+ SEO scammer email addresses that contact website owners offering money for links but never pay. Updated regularly. Check before accepting any guest post or link deals.",
    featuredImage: {
      src: '/images/seo-scammers.jpg',
      alt: 'SEO scammers targeting website owners with fake link building offers',
      width: 1000,
      height: 586,
    },
    type: 'post',
    content: `
<p>Has your website been contacted for publication with a monetary reward? The following are classed as scammers and don't pay afterwards.</p>

<p>Don't deal with the following if they contact you to place content. They do not pay and are scamming marketing from paying clients.</p>

<figure>
  <img src="/images/seo-scammers.jpg" alt="Person receiving fake SMS scam or phishing message on phone" width="1000" height="586" loading="lazy" />
</figure>

<h2>Latest Additions</h2>
<ul>
  <li>charlotterusse795@gmail.com</li>
  <li>seoservices431@gmail.com</li>
  <li>camm.digitalseo@gmail.com</li>
  <li>mikeyeditorialpr@gmail.com</li>
  <li><strong>outreach.iryna@gmail.com</strong></li>
  <li>backlinkletter.agency@gmail.com</li>
  <li>muhammaduzair.ca278@gmail.com</li>
  <li>amuhammadahmad531@gmail.com</li>
</ul>
<p>Building links to: <code>https://aucasinoslist.com/casinos/new-casinos/</code></p>

<h2>Full List of Known SEO Scammer Emails</h2>
<ol>
  <li>monashezadiseo@gmail.com</li>
  <li>egray867@gmail.com</li>
  <li>asad@neverstopmedia.com</li>
  <li>shoaibsaddique23@gmail.com</li>
  <li>refiliazayn44@gmail.com</li>
  <li>noorulhaq78678@gmail.com</li>
  <li>mayank@eseosolutions.com</li>
  <li>clarkmoris9@gmail.com</li>
  <li>cameron.krugerseo@gmail.com</li>
  <li>walichseo786@gmail.com</li>
  <li>gullbrother07@gmail.com</li>
  <li>thomeshebret@gmail.com</li>
  <li>asimzia1567@gmail.com</li>
  <li>palreshu541@gmail.com</li>
  <li>josefhoney026@gmail.com</li>
  <li>qualityguestpostservice@gmail.com</li>
  <li>sundasabacus@gmail.com</li>
  <li>palreshu541@gmail.com</li>
  <li>khanzarawork@gmail.com</li>
  <li>mayank@eseosolutions.com</li>
  <li>lauraphillips878@gmail.com</li>
  <li>ok4937342@gmail.com</li>
  <li>jeebutt439@gmail.com</li>
  <li>ozzyraja32@gmail.com</li>
  <li>guestpostoutreach2@gmail.com</li>
  <li>george.andrew@oxylabsgrowth.io</li>
  <li>eruj.zubair@tekrevol.com</li>
  <li>hanan1010290368@gmail.com</li>
  <li>hamzashoiab315@gmail.com</li>
  <li>malikhusnian912@gmail.com</li>
  <li>fojbok@gmail.com</li>
  <li>hassannajeeb2120@gmail.com</li>
  <li>arslanmehmood100134@gmail.com</li>
  <li>iqbal1002896757@gmail.com</li>
  <li>abidnajam6@gmail.com</li>
  <li>marketing.agency.usa@gmail.com</li>
  <li>maazsheikh00786@gmail.com</li>
  <li>sharmaannat718@gmail.com</li>
  <li>felixsilas693@gmail.com</li>
  <li>k.b@webmediagroup.org</li>
  <li>dangakich@gmail.com</li>
  <li>karenalucy46@gmail.com</li>
  <li>anantoutreach@gmail.com</li>
  <li>vineetsmith30@gmail.com</li>
  <li>samoonlalaiftkhar@gmail.com</li>
  <li>fatimike33@gmail.com</li>
  <li>alexjorge5544@gmail.com</li>
  <li>parkgrason@gmail.com</li>
  <li>margartlissa@gmail.com</li>
  <li>www.aliahmad808@gmail.com</li>
  <li>alibutt3070@gmail.com</li>
  <li>mahajannidhi309@gmail.com</li>
  <li>alexwalton954@gmail.com</li>
  <li>elenasmithh93@gmail.com</li>
  <li>alessandraanna1055@gmail.com</li>
  <li>alessandraanna1055@gmail.com</li>
  <li>alyssajacey5@gmail.com</li>
  <li>elanieapolline43@gmail.com</li>
  <li>guestpost67@gmail.com</li>
  <li>basitwaris6@gmail.com</li>
  <li>saniseouk@gmail.com</li>
  <li>bancroftchris44@gmail.com</li>
  <li>f.glowjutt@gmail.com</li>
  <li>galangalan306@gmail.com</li>
  <li>vegasventage@gmail.com</li>
  <li>terenkig33@gmail.com</li>
  <li>bancroftchris44@gmail.com</li>
  <li>bradpeterson@precisionsy.com</li>
  <li>ferwa1993@gmail.com</li>
  <li>outreach.leelija@gmail.com</li>
  <li>arbabtariq1gbob@gmail.com</li>
  <li>k19021016@gmail.com</li>
  <li>k3919820@gmail.com</li>
  <li>mimran28227@gmail.com</li>
  <li>arshimahasham@gmail.com</li>
  <li>sanabibi097@gmail.com</li>
  <li>mrarcher155@gmail.com</li>
  <li>ellalogan1991@gmail.com</li>
  <li>evilythoma@gmail.com</li>
  <li>maxewell9@gmail.com</li>
  <li>miannomi6467@gmail.com</li>
  <li>sanabibi097@gmail.com</li>
  <li>sheezasheezamazaffar456@gmail.com</li>
  <li>maxewell9@gmail.com</li>
  <li>usmanseo.g@gmail.com</li>
  <li>adilshah1239906668@gmail.com</li>
  <li>mahiabid83@gmail.com</li>
  <li>ben500947@gmail.com</li>
  <li>k19021016@gmail.com</li>
  <li>saimqs021@gmail.com</li>
  <li>mukhtarriaz644@gmail.com</li>
  <li>eden.ving@gmail.com</li>
  <li>eliseemma878@gmail.com</li>
  <li>henrycomila@gmail.com</li>
  <li>travisrylan999@gmail.com</li>
  <li>harrybrock80@gmail.com</li>
  <li>devvivaan2@gmail.com</li>
  <li>abhiseknal0000@gmail.com</li>
  <li>billbroan3@gmail.com</li>
  <li>mayapatil281995@gmail.com</li>
  <li>abid2mahi@gmail.com</li>
  <li>mariaanthony090@gmail.com</li>
  <li>jhonseo52@gmail.com</li>
  <li>currans637@gmail.com</li>
  <li>Hema.seth@intellipaat.com</li>
  <li>millerjohn0852@gmail.com</li>
  <li>itsmishacollins08@gmail.com</li>
  <li>lukeemma06@gmail.com</li>
  <li>ishusinghseo12@gmail.com</li>
  <li>millerjohn0852@gmail.com</li>
  <li>kajial225@gmail.com</li>
  <li>averillmark148@gmail.com</li>
  <li>usmanjose1@gmail.com</li>
  <li>morconi74@gmail.com</li>
  <li>j7688124@gmail.com</li>
  <li>rajeshkumaryadav98@gmail.com</li>
  <li>builderlink85@gmail.com</li>
  <li>mitchell@halvorsonmediagroup.com</li>
  <li>sajawalyounask012@gmail.com</li>
  <li>sknashabbir@gmail.com</li>
  <li>seolinkswebs@gmail.com</li>
  <li>jamesunderson678@gmail.com</li>
  <li>jackleach470@gmail.com</li>
  <li>rashikasharm11@gmail.com</li>
  <li>marjorieramosm@gmail.com</li>
  <li>monicaluccille@gmail.com</li>
  <li>kw91503@gmail.com</li>
  <li>akkiseo952995@gmail.com</li>
  <li>benlara4444@gmail.com</li>
  <li>juddtrump167@gmail.com</li>
  <li>jimmyjhonson5555@gmail.com</li>
  <li>najamdeen326@gmail.com</li>
  <li>albert@myprofitengine.com</li>
  <li>donnawillison50@gmail.com</li>
  <li>sainadeem647@gmail.com</li>
  <li>officelevoevoline@gmail.com</li>
  <li>sainadeem647@gmail.com</li>
  <li>taylorbenz111@gmail.com</li>
  <li>maxwillaim997@gmail.com</li>
  <li>ansraza686@gmail.com</li>
  <li>leviandersonseo@gmail.com</li>
  <li>vladzakharov@admixglobal.com</li>
  <li>seohob.com@gmail.com</li>
  <li>anastasiasteele086@gmail.com</li>
  <li>infobarchart@gmail.com</li>
  <li>bordsiti35@gmail.com</li>
  <li>kanifix669@gmail.com</li>
</ol>

<p><em>This list is updated regularly. If you have received a scam email from an address not listed here, please <a href="/contact">contact us</a> to report it.</em></p>
`,
  },
  {
    slug: 'www-zerogpt-com-fraud-links',
    title: 'www.zerogpt.com – Fraud Links',
    date: 'July 29, 2023',
    dateISO: '2023-07-29',
    excerpt:
      'The owners of ZeroGPT website are contacting websites, asking to promote their website, with monetary reward. They do not pay and hope for a free link.',
    metaDescription:
      'Warning: www.zerogpt.com owners are contacting website owners offering monetary rewards for promotional links. They do not pay. See the evidence and protect your site.',
    type: 'post',
    content: `
<p>The owners of ZeroGPT website are contacting websites, asking to promote their website, with monetary reward. They do not pay and hope for a free link.</p>

<h2>Evidence</h2>
<figure>
  <img src="/images/zerogpt-fraud-email.png" alt="ZeroGPT fraud email screenshot showing their contact requesting free links" width="1024" height="62" loading="lazy" />
</figure>

<h2>What to Do</h2>
<p>If you have been contacted by ZeroGPT or any similar site offering monetary rewards for links, do not accept until payment is received. Scammers count on you publishing the link before they pay, then they disappear.</p>

<p>If you have received a similar offer, <a href="/contact">contact us</a> or check our <a href="/list-of-different-seo-scammers-email">full list of SEO scammer emails</a>.</p>
`,
  },
]

export const pages: Post[] = [
  {
    slug: 'scamdex',
    title: 'Scamdex',
    date: '',
    dateISO: '',
    excerpt: 'The index page of known and suspected scammers.',
    metaDescription:
      'Scamdex: The index of known and suspected online scammers. Find email addresses, usernames, and websites associated with fraud, phishing, and marketing scams.',
    type: 'page',
    content: `
<p>The index page of known / suspect scammers. If you find an email, username, or website on this page, avoid that person at all costs. The wall / page of shame:</p>

<div class="scammer-entry">
  <p><strong>Email:</strong> mail.grunbaum@gmail.com</p>
  <p><strong>LinkedIn:</strong> Pablo Grunbaum (Presumed Fake)</p>
  <p><strong>Operating On:</strong> Emails, Social Media</p>
  <p><strong>Scam:</strong> Middle Man Marketing Scams</p>
  <p><strong>Involvement:</strong> <a href="http://cryptofairplay.com" rel="nofollow noopener" target="_blank">cryptofairplay.com</a></p>
  <p><a href="/usernames-and-emails-relating-to-scams">Read the full report &rarr;</a></p>
</div>

<hr />

<div class="scammer-entry">
  <p><strong>Username:</strong> seosea01</p>
  <p><strong>Operating On:</strong> Freelancer.com</p>
  <p><strong>Scam:</strong> Fraud via Google Ads</p>
  <p><a href="/google-ads-dont-become-a-victim-of-fraud">Read more &rarr;</a></p>
</div>

<hr />

<div class="scammer-entry">
  <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rock-099992158/" rel="nofollow noopener" target="_blank">https://www.linkedin.com/in/rock-099992158/</a></p>
</div>

<figure>
  <img src="/images/scamdex-evidence.png" alt="Scamdex evidence screenshot of scammer profile" width="1010" height="488" loading="lazy" />
</figure>

<p>Those involved with scams will be investigated, as you'll see.</p>
`,
  },
  {
    slug: 'scam-baiters',
    title: 'Scam Baiters',
    date: '',
    dateISO: '',
    excerpt: 'Resources and links to notable scam baiters who expose and fight back against online scammers.',
    metaDescription:
      'Discover top scam baiters who actively expose online fraudsters. We highlight the best scam baiting content creators who help protect people from internet scams.',
    type: 'page',
    content: `
<p>Scam baiters are individuals who respond to scammers to waste their time, expose their methods, and protect potential victims. Here are some of the best:</p>

<h2>#1 KitBoga</h2>
<p><a href="https://www.twitch.tv/kitboga" rel="noopener" target="_blank">KitBoga on Twitch</a> is one of the most well-known scam baiters, streaming live sessions where he wastes scammers' time and exposes their tactics. His content is both educational and entertaining, helping millions of people understand how tech support scams, IRS scams, and refund scams operate.</p>

<p>By wasting a scammer's time, scam baiters directly reduce the number of real victims those scammers can reach.</p>
`,
  },
  {
    slug: 'we-know-who-you-are',
    title: 'We Know Who You Are',
    date: '',
    dateISO: '',
    excerpt: "Think a VPN and a fake name is your safeguard? Think again. We can find you.",
    metaDescription:
      "A warning to online scammers: VPNs and fake names won't protect you. ScamsAdvice.com investigates and exposes fraudsters operating online.",
    type: 'page',
    content: `
<p>Think a VPN and a fake name is your safeguard? Think again. We can find you. Enjoy!</p>

<p>Online scammers often believe they are anonymous and untouchable. The reality is that digital forensics, IP tracking, payment records, and social engineering can expose the real identities behind even the most careful fraudsters.</p>

<p>If you are operating a scam and have been reported to us, we will investigate and publish our findings. Law enforcement agencies are also made aware of credible reports.</p>

<p>If you believe you know the identity of a scammer, please <a href="/contact">contact us confidentially</a>.</p>
`,
  },
  {
    slug: 'contact',
    title: 'Contact',
    date: '',
    dateISO: '',
    excerpt: 'Contact ScamsAdvice.com to report a scam, submit evidence, or ask a question.',
    metaDescription:
      'Contact ScamsAdvice.com to report an online scam, submit evidence of fraud, or ask questions about protecting yourself from internet scammers.',
    type: 'page',
    content: '',
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getPageBySlug(slug: string): Post | undefined {
  return pages.find((p) => p.slug === slug)
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.slug)
}
